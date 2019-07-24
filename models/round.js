const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const scorecardSchema = new Schema({
    golfer: {type: Schema.Types.ObjectId, ref: 'Golfer'},
    handicap_strokes: {type: Number, required: false},
    tee: {type: String, required: false}, 
    holes: {type: [{number: Number, par: Number, score: Number, handicap: Number, handicap_strokes: Number}], required: false}
})

const holeScoreSchema = new Schema({
  number: {type: Number},
  par: {type: Number},
  net_score: {type: Number}
})

const groupSchema = new Schema({
    groupTitle: {type: String, required: false},
    scorecards: {type: [scorecardSchema]},
    groupScores: {type: [holeScoreSchema]}
})

const roundSchema = new Schema({
    description: {type: String, required: false}, 
    groups: {type: [groupSchema], required: false}, 
    date: {type: Date, required: false}, 
    course: {type: Schema.Types.ObjectId, ref: 'Course', required: false}, 
    score_type: {type: String, required: false}
    
});




module.exports = {
  Round: mongoose.model( 'Round', roundSchema), 
  Group: mongoose.model( 'Group', groupSchema), 
  Scorecard: mongoose.model( 'Scorecard', scorecardSchema)
  
};



