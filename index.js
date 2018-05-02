
const express = require ('express');
const morgan = require ('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const path = require('path');
const pg = require('pg');
const wikiRouter = require('./routes/wiki');

const models = require('./models');
let Page = models.Page;
let User = models.User;

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


app.use('/wiki', wikiRouter);

//Error Handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
})

// WAY # 1 TO SYNC MODELS
// User.sync()
// .then( () => {
//     return Page.sync();
// })
// .then(() => {
//     app.listen('3000', () => {
//         console.log('Server is Listening On Port 3000!!!');
//     })
// })

//------------------------------------//

// WAY # 2 TO SYNC MODELS
models.db.sync()
.then( () => {
    console.log('All Tables Created!');
     app.listen('3000', () => {
        console.log('Server is Listening On Port 3000!!!');
    });
})
.catch(console.error.bind(console));