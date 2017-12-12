var validationRules = require('./userValidationRules'),
    database = require('./database'),
    userToken = require('./userToken'),
    logger = require('./logger');
module.exports = {
    getUserId: function(userName) {
        var randomNumber = Math.floor(Math.random() * Math.max / Math.Infinty);
        return userName + randomNumber;
    },
    homePageHandler: function(req, res, next) {
        //console.info(res);
        res.render('index.html')
        //res.send(200);
    },
    userRegistrationHandler: function(req, res, next) {
        var responseObj = new Object();
        database.executeQuery({ userEmail: req.body.emailId }).then(function(docs, err) {
            if (docs) {
                logger.info('user already exists');
                responseObj = { errorMsg: 'user is already registered,please try different email id or try to login', isRegistrationSuccessFull: false, userObj: null };
                res.send(responseObj)
            } else {
                if (err) {
                    logger.info(err.toString());
                    responseObj = { errorMsg: 'something went wrong please try again after sometime', isRegistrationSuccessFull: false, userObj: null };
                    res.send(responseObj)
                } else {
                    database.insertRecord({ firstName: req.body.firstName, lastName: req.body.lastName, password: req.body.password, userEmail: req.body.emailId, userPhoneNumber: req.body.phoneNumber, userId: req.body.firstName + req.body.lastName + Math.floor(Math.random() * 100000), address: req.body.address, isLoggedIn: true }).then(function(docs, error) {
                        if (docs) {
                            logger.info('inserted user details');
                            database.executeQuery({ userEmail: req.body.emailId }).then(function(docs, error) {

                                if (docs) {
                                    responseObj.userObj = new Object();
                                    for (var keys in docs) {
                                        if (keys === 'firstName' || keys === 'lastName' || keys === 'userEmail' || keys === 'userId') {
                                            responseObj.userObj[keys] = docs[keys];
                                        }
                                    }
                                    req.session.name = responseObj.userObj.userId;

                                    res.setHeader('Auth', userToken.generateUserToken(responseObj.userObj.userId));
                                    responseObj.errorMsg = null;
                                    responseObj.isRegistrationSuccessFull = true;
                                    res.send(responseObj);


                                }
                            })
                        } else {
                            logger.info('failed to insert user details');
                            responseObj = { errorMsg: 'something went wrong please try again after sometime', isRegistrationSuccessFull: false, userObj: null };
                            res.send(responseObj)
                        }
                    })
                }
            }
        })
        //res.send(200);
    },
    userProfile: function(req, res, next) {
        var responseObj = new Object();
        database.executeQuery({ userId: req.session.name }).then(function(docs, error) {

            if (docs) {
                logger.info('got user details');
                responseObj.userObj = {};
                for (var keys in docs) {
                    if (keys !== '_id') {
                        responseObj.userObj[keys] = docs[keys];
                    }
                }
                req.session.name = responseObj.userObj.userId;
                responseObj.errorMsg = null;
                res.send(responseObj);
            } else {
                if (error) {
                    responseObj.errorMsg = 'error in getting details ,please try again !!!';
                    responseObj.userObj = null;
                    res.send(responseObj);
                }

            }
        })
    },
    appNotifications: function(req, res, next) {
        console.info(req);
        res.send(200);
    },
    userLoginHanlder: function(req, res, next) {
        var responseObj = new Object();
        console.log(req.body)
        database.executeQuery('find_any',[{ userEmail: req.body.userName, userPhoneNumber: req.body.userPhoneNumber, password: req.body.password }]).then(function(docs, error) {
            console.log(docs)
            if (docs) {
                logger.info('successfully user logged-in ' + req.body.userName);
                database.executeQuery({ userEmail: req.body.userName, userPhoneNumber: req.body.userPhoneNumber }).then(function(docs, error) {
                    if (docs) {
                        logger.info('got user details');
                        responseObj.userObj = new Object();
                        for (var keys in docs) {
                            if (keys === 'firstName' || keys === 'lastName' || keys === 'userEmail' || keys === 'userId') {
                                responseObj.userObj[keys] = docs[keys];
                            }
                        }
                        req.session.name = responseObj.userObj.userId;
                        res.setHeader('Auth', userToken.generateUserToken(responseObj.userObj.userId));
                        responseObj.errorMsg = null;
                        responseObj.isRegistrationSuccessFull = false;
                        res.send(responseObj);
                    }
                })
            } else {
                if (error) {
                    logger.info('error in updating details for user ' + req.body.userId);
                    responseObj.errorMsg = 'error in updating user details,please try again!!!';
                    responseObj.userObj = null;
                    res.send(responseObj)
                } else if (docs === null) {
                    logger.info('no record is found for user ' + req.body.userName);
                    responseObj.errorMsg = 'Username and password did not match please try again';
                    responseObj.isLoggedIn = false;
                    responseObj.userObj = null;
                    res.send(responseObj);
                }
            }
        })
        //res.send(200);
    },
    updateUserProfile: function(req, res, next) {
        var responseObj = new Object();
        if (req.session.name === req.body.userId) {
            database.updateRecord({ userId: req.body.userId }, { firstName: req.body.firstName, lastName: req.body.lastName, password: req.body.password, userEmail: req.body.userEmail, userPhoneNumber: req.body.userPhoneNumber, address: req.body.address, userId: req.body.userId, isLoggedIn: true }).then(function(docs, error) {
                if (docs) {
                    logger.info('updated user information successfully for user' + req.body.userId);
                    database.executeQuery({ userId: req.body.userId }).then(function(docs, error) {
                        if (docs) {
                            logger.info('got user details');
                            responseObj.userObj = new Object();
                            for (var keys in docs) {
                                if (keys !== '_id') {
                                    responseObj.userObj[keys] = docs[keys];
                                }
                            }
                            req.session.name = responseObj.userObj.userId;
                            responseObj.errorMsg = null;
                            res.send(responseObj);
                        } else {
                            if (error) {
                                logger.info('error in updating details for user' + req.body.userId);
                                responseObj.errorMsg = 'error in updating user details,please try again!!!';
                                responseObj.userObj = null;
                                res.send(responseObj)
                            }
                        }
                    })
                } else if (error) {
                    logger.info('error in updating details for user' + req.body.userId);
                    responseObj.errorMsg = 'error in updating user details,please try again!!!';
                    responseObj.userObj = null;
                    res.send(responseObj)
                }

            })
        }
        //res.sendStatus(200);

    },
    handleLogOutUser: function(req, res, next) {
        if (req.body.userName === req.session.name) {
            database.update({ userEmail: req.body.userEmail }, { isLoggedIn: false }).then(function(docs, error) {
                if (docs) {
                    logger.info('got user details');
                    responseObj.userObj = new Object();
                    responseObj.isLoggedIn = false;
                    responseObj.errorMsg = null;
                    delete req.session.name;
                    res.send(responseObj);
                } else {
                    if (error) {
                        logger.info('error in logging out user' + req.body.userId);
                        responseObj.errorMsg = 'error in logging out user';
                        responseObj.userObj = null;
                        res.send(responseObj)
                    }
                }
            })
        }

        // res.sendStatus(200);
    }
}