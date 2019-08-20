const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const rfaSchema = new Schema({
    owner: {type: Schema.Types.ObjectId, ref: 'TeamOwner'
           },
    name: {type: String, required: false},
    adv: {type: Number}
})

const teamOwnerSchema = new Schema({
  name: {type: String, required: true}, 
  teamname: {type: String, required: true}, 
  espn_team_id: {type: Number, required: false}
})

const bidSchema = new Schema({
  bidder: {type: String, required: true}, 
  bid_amount: {type: Number, required: true}, 
  rfa: {type: Schema.Types.ObjectId, ref: 'RFA'}
})

module.exports = {
  rfa: mongoose.model( 'RFA', rfaSchema, 'rfas'), 
  teamOwner: mongoose.model('TeamOwner', teamOwnerSchema, 'teamOwners'),
  bid: mongoose.model('Bid', bidSchema, 'bids')
};



