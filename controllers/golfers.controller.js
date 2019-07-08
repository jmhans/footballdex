/*jshint esversion: 6 */

const request = require('request');
const ObjectId = require('mongoose').Types.ObjectId;

const Golfer = require('./../models/golfer');

var GolfersController = {

    _get: function(req, res) {
      
      
    Golfer.find({}, (err, golfer) =>  {

      var golfers = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (!golfer) {
        return res.status(400).send({message: 'No golfers found.'});
      } else {
        golfer.forEach(bs => {
          golfers.push(bs);
        });
      }
      return res.send(golfers)
    });
   
  },
  
  
}

module.exports = GolfersController








