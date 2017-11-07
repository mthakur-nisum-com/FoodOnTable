var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    path = require('path'),
    config = require('./configLib/config'),
    database = require('./configLib/database'),
    port = config.port,
    databaseObj = null,
    session = require('express-session'),
    MongoStore = require('connect-mongodb-session')(session),
    assert = require('assert'),
    store = new MongoDBStore({
        uri: config.databaseConnectionUrl,
        collection: 'mySessions'
    });

database.connect(config.databaseConnectionUrl, function(resultObj) {
    if (resultObj.status) {
        console.log('connected to database successfully !!!');
        databaseObj = resultObj.db;
    }
})
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
app.get('/', function(req, res, next) {
    console.log(req.session)
    if (req.session.views) {
        req.session.views++
            res.setHeader('Content-Type', 'text/html')
        res.write('<p>views: ' + req.session.views + '</p>')
        res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
        res.end()
    } else {
        req.session.views = 1
        res.end('welcome to the session demo. refresh!')
    }
    //console.log(req.app.get('env'));

    //res.render('index.html');
})
app.listen(port);
console.log('listening to ' + port);