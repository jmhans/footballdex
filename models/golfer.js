const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const golferSchema = new Schema({
    nickname: {type: String, required: true}, 
    handicap: {type: String, required: false}
});

module.exports = mongoose.model( 'Golfer', golferSchema);


