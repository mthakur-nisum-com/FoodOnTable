var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    path = require('path'),
    config = require('./configLib/config'),
    database = require('./configLib/database'),
    port = config.port,
    databaseObj = null,
    session = require('express-session'),
    validate = require('express-validation'),
    MongoStore = require('connect-mongodb-session')(session),
    validationRules = require('./configLib/userValidationRules'),
    assert = require('assert'),
    store = new MongoStore({
        uri: config.databaseConnectionUrl,
        collection: 'mySessions'
    }),
    appUrl = require('./configLib/appUrls'),
    appRoute = require('./configLib/appRoutes');
database.connect(config.databaseConnectionUrl, function(resultObj) {
    if (resultObj.status) {
        console.log('connected to database successfully !!!');
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
    cookie: { secure: true, maxAge: config.sessionMaxAge },
    store: store
}))
store.on('error', function(error) {
    assert.ifError(error);
    assert.ok(false);
});
app.get(appUrl.home, appRoute.homePageHandler); // handles '/' request
app.post(appUrl.userLogin, appRoute.userLoginHanlder); // user login handler
app.post(appUrl.userRegistration,validate(validationRules.registration), appRoute.userRegistrationHandler); // user registration handler
app.get(appUrl.userProfile, appRoute.userProfile); //  user profile handler
app.put(appUrl.userProfile, appRoute.userProfile) //  updated user profile handler
app.get(appUrl.notifications, appRoute.appNotifications); //  notifications handler
app.use(function(err, req, res, next){
  console.log(err)
 /* if(err.status >= 400 && err.status<500){
  	 if(req.route.path === '/api/register'){
  	 	console.log(req.route.path)
			next();
  	 }
  }
  else {
  	if(req.status>=500) {

  	}
  }*/
  	//next();
  //res.status(400).json(err);
});
app.listen(port);
console.log('listening to ' + port);