var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    path = require('path'),
    port = process.env.port || 9900;
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public/html'));
app.engine('html', require('ejs').renderFile);
app.get('/', function(req, res) {
   res.render('index.html');
})
app.listen(port);
console.log('listening to ' +port);