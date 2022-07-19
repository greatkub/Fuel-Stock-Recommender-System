var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var TL = new Schema({
  Tank: String,
  volume:String, 
  ullage: String
});

//Export function to create "NewsSchema" model class
module.exports = mongoose.model('TL', TL );