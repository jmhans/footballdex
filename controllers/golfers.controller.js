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
 
   _post: function(req, res) {

    Golfer.findOne({
      nickname: req.body.nickname
      }, (err, existingGolfer) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (existingGolfer) {
        return res.status(409).send({message: 'You have already created a golfer with that nickname.'});
      }
      const golfer = new Golfer({
        nickname: req.body.nickname, 
        handicap: req.body.handicap
      });
      golfer.save((err) => {
        if (err) {
          return res.status(500).send({message: err.message});
        }
        res.send(golfer);
      });
    });
    
    
  },
    
  _put: function(req, res) {
    Golfer.findById(req.params.id, (err, golfer) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (!golfer) {
        return res.status(400).send({message: 'Golfer not found.'});
      }
      golfer.nickname = req.body.nickname;
      golfer.handicap = req.body.handicap;
      
      golfer.save(err => {
        if (err) {
          return res.status(500).send({message: err.message});
        }
        res.send(golfer);
      });
    });
  }, 

  
}

module.exports = GolfersController








