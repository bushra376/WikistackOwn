//Build SubRouter 
const express = require('express');
const router = express.Router();
const models = require('../models');
let Page = models.Page;
module.exports = router;

// GET /wiki
router.get('/', (req, res, next) => {
    Page.findAll({

    }).then( (pages) => {
        res.render('index' , {pages});
    })
    .catch(next);
})

// POST /wiki
router.post('/',(req,res,next) => {
    // 1ST WAY OF DEFINING NEW INSTANCE
    // let newPage = Page.build({
    //     title: req.body.title,
    //     content: req.body.content,
    //     status: req.body.status
    // }); 

    //----------------------------//

    //2ND WAY OF DEFINING NEW INSTANCE
    let newPage = Page.build(req.body); //bec req.body already contains title, content & status
    
    newPage.save()
    .then( (savedPage) => {
        res.redirect(savedPage.route);
    })
    .catch( (err) => {
        next(err);
    })
})

// GET /wiki/add
router.get( '/add', (req, res, next) => {
    res.render('addpage');
});

// GET /wiki/Javascript
router.get('/:urlTitle', (req,res,next) => {
    let urlTitleOfAPage = req.params.urlTitle;
    Page.findOne({
        where: {
            urlTitle: urlTitleOfAPage
        }
    })
    .then( (page) => {
        if(page === null){
            return next(new Error("That page was not found!!!"));
        }
        res.render('wikipage', {
            page
        })
    })
    .catch(next);
})