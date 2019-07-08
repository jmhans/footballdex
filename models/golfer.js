const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const golferSchema = new Schema({
    nickname: {type: string, required: true} 
});

module.exports = mongoose.model( golferSchema);


