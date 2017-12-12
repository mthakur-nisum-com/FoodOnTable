var jwt = require('jsonwebtoken');
var database = require("./database"),
    config = require('./config');

module.exports = {
    generateUserToken: function(userName) {
        console.log(userName)
        return jwt.sign(userName, config.appSecretKey);
    },
    getUserToken: function(userName) {
    	return jwt.verify(userName, config.appSecretKey)
    },
    authenicateUser: function(req, res, next) {
        var userInfo = null;
        console.log(req.headers.authorization)
        if (req.headers.authorization) {
            userInfo = jwt.verify(req.headers.authorization, config.appSecretKey);
            console.log(userInfo,req.session.name)
            if (userInfo && userInfo === req.session.name) {
                database.executeQuery({ userId: userInfo }).then(function(docs, error) {
                    console.log(docs, error)
                    if (docs) {
                        next();
                    } else {
                    	if(error){
                    		 res.sendStatus(401);
                    	}
                    	else if(docs === null) {
                    		res.sendStatus(401)
                    	}
                       
                    }
                })
            }
            else {
            	 res.sendStatus(401);
            }

        } else {
            res.sendStatus(401);
        }
    }
}