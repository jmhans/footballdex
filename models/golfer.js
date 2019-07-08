const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const golferSchema = new Schema({
    nickname: {type: String, required: true} 
});

module.exports = mongoose.model( 'Golfer', golferSchema);


