var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var multer = require('multer');

const mongoose = require('mongoose');
const todoUser = require('./geomodel');


var routs = require('./routes/routes');
var grouts = require('./routes/georoutes');

var app = express();
// // es 3-@ nra hamara vor ejs-um ogtagorcenq html fayler
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
// app.use('/uploads', express.static('uploads'));


app.use('/', routs);
app.use('/api', grouts);


let db = mongoose.connect('mongodb://localhost:27017/test_geo', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
db.then(
    () => { console.log('Conection done.'); },
    err => { console.log(err); }
);






const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('Server has been started...');
});