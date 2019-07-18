const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const scorecardSchema = new Schema({
    golfer: {type: Schema.Types.ObjectId, ref: 'Golfer'},
    handicap_strokes: {type: Number, required: false},
    tee: {type: String, required: true}, 
    holes: {type: [{number: Number, par: Number, score: Number, handicap: Number, handicap_strokes: Number}], required: false}
})

const groupSchema = new Schema({
    groupTitle: {type: String, required: false},
    scorecards: {type: [scorecardSchema]}
})

const roundSchema = new Schema({
    description: {type: String, required: true}, 
    groups: {type: [groupSchema], required: false}, 
    date: {type: Date, required: false}, 
    course: {type: Schema.Types.ObjectId, ref: 'Course', required: false}
});


module.exports = {
  Round: mongoose.model( 'Round', roundSchema), 
  Group: mongoose.model( 'Group', groupSchema), 
  Scorecard: mongoose.model( 'Scorecard', scorecardSchema)
};



