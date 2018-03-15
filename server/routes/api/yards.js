var express = require('express');
var request = require('request');
var router = express.Router();
var bodyParser = require('body-parser');
var md5 = require('md5');
var nodemailer = require('nodemailer');
var cors = require('cors');
var Yard = require('../../schema/yards');

// CREATES A NEW USER
router.get('/all',cors(), function (req, res) {
    Yard.find({}, function(err, results){
        if(err)return res.status(400).send("Error when get all yard in database!");
        return res.status(200).send({
            data: results,
            message: "Successfully"
        })
    })
});

router.post('/add',cors(),function (req, res) {
    console.log("===========[add yard]=========");

    User.find({phone:req.body.name},
        function (err, yard) {
            if (err) return res.status(500).send({
                message : "There was a problem finding the yard in database."
            });

            // res.status(200).send(users);
            if(yard[0] === undefined){
                //create log
                console.log("===========[add yard]==========");
                Yard.create({idYard: md5(req.body.name),
                            name: req.body.name,
                            phone:req.body.phone,
                            pos: req.body.pos,
                            pics:req.body.pics,
                            idUser: req.body.idUser},
                        function(error, result){
                            if(error)return res.status(500).send("Error when create new yard")
                            return res.status(200).send({
                                data: result,
                                message: "successfuly"
                            })
                        })
                
            }
            else{
                //console.log(users[0].password);
                console.log(users[0].idYard);
                return res.status(500).send("Yard existed!");
            }

        });
});

module.exports = router;