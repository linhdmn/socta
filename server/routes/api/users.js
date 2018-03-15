var express = require('express');
var request = require('request');
var router = express.Router();
var bodyParser = require('body-parser');
var md5 = require('md5');
var nodemailer = require('nodemailer');
var cors = require('cors');
var firebase = require('firebase');
var config = {
    apiKey: "AIzaSyA1YSWcpvbH5Vh613vdTqstNVczdWe_R_g",
    authDomain: "socta-df344.firebaseapp.com",
    databaseURL: "https://socta-df344.firebaseio.com",
    projectId: "socta-df344",
    storageBucket: "socta-df344.appspot.com",
    messagingSenderId: "566525809792"
  };
firebase.initializeApp(config);
var User = require('../../schema/user');

// CREATES A NEW USER
router.get('/verify',cors(), function (req, res) {
    var code = req.body.code;
    var phoneNumber = req.body.phone;
    // firebase.auth().signInWithPhoneNumber(phoneNumber, code);
    User.findOneAndUpdate({idUser:req.query.id}, {isVerify:true}, function (err, user) {
        if (err) {
            return res.status(500).send("There was a problem updating the user.");
        }
        console.log(user.isVerify);
        return res.status(200).send("The account has been verified. Please log in.");
    });
});

router.post('/login',cors(), function(req, res){
    User.findOne({phone:req.body.phone},
        function (err, user) {
            if (err) return res.status(500).send( "There was a problem finding the users.");
            // res.status(200).send(users);
            if(user !== undefined && md5(req.body.password) === user.password){
                // console.log(user.isVerify == true);
                if(user.isVerify){
                    return res.status(200).send({
                        message  : "Login successfully!",
                        user : {
                            userID: user.idUser,
                            phone: user.email,
                            role: user.role
                        }
                    });
                }else{
                    return res.status(401).send("please verify email");
                }

            }
            else{
                return res.status(401).send("Wrong username or password!");
            }
            
    });
});

router.post('/register',cors(),function (req, res) {
    console.log("===========[register]=========");
    console.log(req.body.phone);
    console.log(req.body.password);

    User.find({phone:req.body.phone},
        function (err, users) {
            if (err) return res.status(500).send({
                message : "There was a problem finding the users."
            });

            // res.status(200).send(users);
            if(users[0] === undefined){
                //create log
                console.log("===========[register]=========   create user");
                var _idUser = md5(req.body.phone);
                if(req.body.role == "Owner"){
                  User.create({idUser: _idUser,
                    name: req.body.name,
                    phone: req.body.phone,
                    password: md5(req.body.password),
                    role: req.body.role,
                    isVerify: true
                    }, function(error, result){
                      if(error) return res.status(400).send("Error when create user in database!");
                      return res.status(200).send("Create new user succesfull");
                    });
                }
                else{
                  User.create({idUser: _idUser,
                    name: req.body.name,
                    phone: req.body.phone,
                    password: md5(req.body.password)
                    }, function(error, result){
                      if(error)return res.status(400).send("Error when create user in database!");
                      return res.status(200).send("Create new user succesfull");
                    });
                }
                
            }
            else{
                //console.log(users[0].password);
                console.log(users[0].idUser);
                return res.status(500).send("Username existed!");
            }

        });
});

module.exports = router;