var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require("cookie-session");
var compress=require("compression");
var directory=require("directory");

var routes = require('./routes/index');
var users = require('./routes/users');
var fs=require("fs");

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('photos', __dirname + '/public/images');
var imgPath="./public/images/a.ico";
app.use(favicon(require.resolve(imgPath)));
var log = fs.createWriteStream('log/myapp.log', { flags: 'a' });
app.use(logger({format:':method :url',stream:log,immediate: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({
    keys: ['key1', 'key2']
}))



app.use('/app/files', express.static('public/javascripts'));
app.use('/', routes);
app.get('/upload', function(req, res){
    var ejs = require('ejs');
    var template = '<%=: price * 1.14 | round:2 %>';
    var context = {price: 21};
    ejs.filters.round = function(number, decimalPlaces) {
        number = isNaN(number) ? 0 : number;
        decimalPlaces = !decimalPlaces ? 0 : decimalPlaces;
        var multiple = Math.pow(10, decimalPlaces);
        return Math.round(number * multiple) / multiple;
    };
    console.log(ejs.render(template, context));
    res.render('photos/upload', {
        title: 'Photo upload'
    });
});

app.post('/upload',  function(req, res, next) {
//    var img = req.files.photo.image;
//    var name = req.body.photo.name || img.name;
//    var path = join(dir, img.name);
    res.download('public/images/a.ico','a.ico');
});
app.use('/users', users);
app.use('/fuck',function(req,res,next){
    if(!req.session.cart){

        req.session.cart = { items: [1,2,3] };
    }else{
        req.session.cart.items.push(4);

    }

    console.info("fcuk you baby");
   next();
});

app.use('/sss',function(req,res){

    console.log("fuck next");
  //  res.setHeader('Set-Cookie', 'foo=bar');
    //res.setHeader('Set-Cookie', 'tobi=ferret;');
    console.log(req.body);
    console.log(req.files);
 //   res.end("fuck you \t\n my");
});

app.use(compress({ level: 3, memLevel: 8 }));




module.exports = app;
