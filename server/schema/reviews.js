var mongoose = require('mongoose');  
var ReviewSchema = new mongoose.Schema({
  idReview: {
    type: String,
    required: true,
    unique: true
  },
  idYard: {
    type: String,
    required: true,
    unique: true
  },
  idUser: {
    type: String,
    required: true,
    unique: true
  },
  content:{
    type:String,
    required: true
  }
});


mongoose.model('reviews', ReviewSchema);
module.exports = mongoose.model('reviews');