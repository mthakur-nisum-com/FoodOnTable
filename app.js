var express = require('express'),
    app = express(),
    jwt = require('express-jwt'),
    bodyParser = require('body-parser'),
    path = require('path'),
    config = require('./configLib/config'),
    database = require('./configLib/database'),
    port = config.port,
    databaseObj = null,
    session = require('express-session'),
    validate = require('express-validation'),
    passport = require("passport"),
    MongoStore = require('connect-mongodb-session')(session),
    validationRules = require('./configLib/userValidationRules'),
    userToken = require('./configLib/userToken');
assert = require('assert'),
    store = new MongoStore({
        uri: config.databaseConnectionUrl,
        collection: 'mySessions'
    }),
    logger = require('./configLib/logger'),
    appUrl = require('./configLib/appUrls'),
    appRoute = require('./configLib/appRoutes');

database.connect(config.databaseConnectionUrl, function(resultObj) {
    if (resultObj.status) {
        console.log('connected to database successfully !!!');
        logger.info('connected to database successfully !!!');
        databaseObj = resultObj.db;
    }
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public/html'));
app.engine('html', require('ejs').renderFile);
app.set('trust proxy', 1);

app.use(session({
    secret: config.appSecretKey,
    resave: false,
    saveUninitialized: true,
    store: store,
    clear_interval: 60 * 60
}))
store.on('error', function(error) {
    assert.ifError(error);
    assert.ok(false);
});
app.all('/api/*', userToken.authenicateUser);
app.get(appUrl.home, appRoute.homePageHandler); // handles '/' request
app.post(appUrl.userRegistration, appRoute.userRegistrationHandler);
app.post(appUrl.userLogin, appRoute.userLoginHanlder); // user login handler
app.get(appUrl.userProfile, appRoute.userProfile); //  user profile handler
app.put(appUrl.userProfile, appRoute.updateUserProfile) //  updated user profile handler
app.get(appUrl.notifications, appRoute.appNotifications); //  notifications handler
app.post(appUrl.userLogOut,appRoute.handleLogOutUser); // user logout
app.use(function(err, req, res, next) {
    console.log(err)
    if (err.name == 'JWTExpressError') {
        // user is unauthorized
        res.status(401);
        res.render('401', { error: err });
    } else {
        next(err);
    }
});


app.listen(port);
console.log('listening to ' + port);
logger.info('listening to ' + port);
module.exports = app;