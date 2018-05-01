 const express = require ('express');
 const morgan = require ('morgan');
 const Sequelize = require('sequelize');
 const bodyParser = require('body-parser');
 const nunjucks = require('nunjucks');
 const path = require('path');

 const app = express();

 //Morgan 
 app.use(morgan('dev'));

//bodyPaerser MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Static Middleware
app.use(express.static(path.join(__dirname, '/public')));

//Nunjucks Comfig
const env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);


 app.use('/',(req,res,next) => {
     res.send("Welcome To Home Page");
 });

 app.listen('3000', () => {
     console.log('Listening On Port 3000!!!');
 })