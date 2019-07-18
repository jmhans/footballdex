const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: {type: String, required: true}, 
    location: {type:String, required: false}, 
    tees: {type: [{name: String, holes:[{number: Number, par: Number, handicap: Number, yds: Number}]}]}
});

module.exports = mongoose.model( 'Course', courseSchema);
