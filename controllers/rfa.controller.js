/*jshint esversion: 6 */

const request = require('request');
const ObjectId = require('mongoose').Types.ObjectId;


const rfa = require('./../models/rfa').rfa;
const teamOwner = require('./../models/rfa').teamOwner;
const bid = require('./../models/rfa').bid;

const BaseController = require('./base.controller');

class RFAController extends BaseController {

  constructor() {
    super(rfa, 'rfas');
  }
  
  _getOne(req, res, next) {
  this.model.findById(req.params.id).populate('owner').exec(function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
}
_get(req, res, next) {
  this.model.find().populate('owner').exec(function(err, results) {
    if (err) return next(err);
    res.json(results);
  });
  }  
  
_create(req, res, next) {
  const model = this.model
  //this.model.find({owner: req.body.owner})
  this.model.find({owner: req.body.owner}).exec(function(err, doc) {
    if (err) {
      res.status(400).send(err);
    }
    if (!doc.length) {
      model.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
      });      
    } else {
      res.status(500).send("Team already has a rfa")
    }

  })
}
  
  
}

class TeamOwnerController extends BaseController {

  constructor() {
    super(teamOwner, 'teamowners');
  }
}

class BidController extends BaseController {

  constructor() {
    super(bid, 'bids');
  }
}


module.exports = {RFA: RFAController, TeamOwner: TeamOwnerController, Bid: BidController}
