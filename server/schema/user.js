var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({
  idUser: {
    type: String,
    required: true,
    unique: true
  },
  name:{
    type:String,
    required: true
  },
  phone:  {
    type: Number,
    unique: true,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  isVerify:{
    type: Boolean,
    required: true,
    default: false
  },
  role: {
    type: String,
    enum: ['Member', 'Leader', 'Owner', 'Admin'],
    default: 'Member'
  }
});


mongoose.model('users', UserSchema);
module.exports = mongoose.model('users');