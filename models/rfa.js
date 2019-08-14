const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const rfaSchema = new Schema({
    owner: {type: Schema.Types.ObjectId, ref: 'TeamOwner'},
    name: {type: String, required: false},
    adv: {type: Number}
})

const teamOwnerSchema = new Schema({
  name: {type: String, required: true}, 
  teamname: {type: String, required: true}
})


module.exports = {
  rfa: mongoose.model( 'RFA', rfaSchema, 'rfas'), 
  teamOwner: mongoose.model('TeamOwner', teamOwnerSchema, 'teamOwners')
};



