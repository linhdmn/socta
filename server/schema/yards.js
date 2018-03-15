var mongoose = require('mongoose');  
var YardSchema = new mongoose.Schema({
  idYard: {
    type: String,
    required: true,
    unique: true
  },
  name:{
    type:String,
    required: true,
    unique: true
  },
  phone:  {
    type: Number,
    unique: true,
    required: true
  },
  pos:{
    type: String,
    required: true
  },
  pics:{
    type: String,
    required: true
  },
  idUser: {
    type: String,
    required: true
  }
});


mongoose.model('yards', YardSchema);
module.exports = mongoose.model('yards');