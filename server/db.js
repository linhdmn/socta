
var mongoose = require('mongoose');
var Promise = mongoose.connect("mongodb+srv://nhatlinhdoan:NQEYL6u1fQdHeIKr@cluster0-39090.mongodb.net/test", 
                { useMongoClient: true })
                .then(console.log("Database connected!"));