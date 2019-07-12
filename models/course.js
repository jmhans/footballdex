const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: {type: String, required: true}, 
    location: {type:String, required: false}, 
    holes: [{number: Number, par: Number, handicap: Number, tees:[{"name": String, "yds": Number}]}]
});

module.exports = mongoose.model( 'Course', courseSchema);
