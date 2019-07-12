const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roundSchema = new Schema({
    description: {type: String, required: true}, 
    groups: {type: [{type: Schema.Types.ObjectId, ref:'Group'}], required: false}, 
    date: {type: Date, required: false}, 
    course: {type: Schema.Types.ObjectId, ref: 'Course', required: false}
});

const groupSchema = new Schema({
    scorecards: {type: [{type: Schema.Types.ObjectId, ref:'Scorecard'}]}
})


const scorecardSchema = new Schema({
    golfer: {type: Schema.Types.ObjectId, ref: 'Golfer'},
    handicap_strokes: {type: Number, required: false},
    holes: {type: [{number: Number, par: Number, score: Number, handicap: Number, handicap_strokes: Number , tee: Object}]}
})

module.exports = {
  Round: mongoose.model( 'Round', roundSchema), 
  Group: mongoose.model( 'Group', groupSchema), 
  Scorecard: mongoose.model( 'Scorecard', scorecardSchema)
};



