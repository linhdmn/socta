var express = require('express');
var request = require('request');
var router = express.Router();
var bodyParser = require('body-parser');
var md5 = require('md5');
var nodemailer = require('nodemailer');
var cors = require('cors');
var Review = require('../../schema/reviews');

// CREATES A NEW REVIEW
router.get('/all',cors(), function (req, res) {
    Review.find({}, function(err, results){
        if(err) return res.status(400).send("Error when get all yard in database!");
        return res.status(200).send({
            message:"successfully get all reviews",
            data: results
        });
    })
});

router.post('/add',cors(),function (req, res) {
    console.log("===========[add review]=========");
    Review.create({
        idReview: md5(req.body.content),
        idYard: req.body.idYard,
        idUser: req.body.idUser,
        content: req.body.content
    }, function(error, results){
        if(error) return res.status(400).send("Error when create new review in database!");
        return res.status(200).send({
            data: results,
            message: "successfully add new review!"
        })
    })
});


module.exports = router;