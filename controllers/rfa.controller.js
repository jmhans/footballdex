/*jshint esversion: 6 */

const request = require('request');
const ObjectId = require('mongoose').Types.ObjectId;

var express = require('express');
var router = express.Router();


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
  
    var _getBidsForRFA = function(rfa) {
      return new Promise(function(resolve, reject) {
        bid.find({rfa: rfa._id}).exec(function (bidErr, bids){
          if(bidErr) return next(err);
          resolve( {rfa: rfa, bids:bids});
        })  
      })
      
    }
  
  this.model.find().populate('owner').exec(function(err, results) {
    if (err) return next(err);

    Promise.all(results.map((rfa)=> {
      return _getBidsForRFA(rfa);
    })).then((rfasWithBids) => {
      res.json (rfasWithBids);
    })  
    //res.json(results);
  });
  }
  

  
  
_getOneWithBids(req, res, next) {
  this.model.findById(req.params.id).populate('owner').exec(function (err, post) {
    if (err) return next(err);
    bid.find({rfa: req.params.id }).exec(function (bidErr, bids) {
      post.bids = bids; 
      res.json({rfa: post, bids: bids});                                       
    });

    
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
  
  
  route() {
    router.get('/' + this.routeString, (...args) => this._get(...args));
    router.post('/' + this.routeString , (...args) => this._create(...args));
    router.get('/' + this.routeString + '/:id', (...args) => this._getOneWithBids(...args));
    router.put('/' + this.routeString + '/:id', (...args) => this._update(...args));
    router.delete('/' + this.routeString + '/:id', (...args) => this._delete(...args));
    return router;
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
  
  _getBidsForEmail(req, res, next) {
  
    this.model.find({bidder: req.params.email}).populate('rfa').exec(function(err, bids) {
      if (err) return next(err);
      res.json(bids);
    })
  
  }
  
route() {
    router.get('/' + this.routeString, (...args) => this._get(...args));
    router.post('/' + this.routeString , (...args) => this._create(...args));
    router.get('/' + this.routeString + '/:id', (...args) => this._getOne(...args));
    router.get('/' + this.routeString + '/:id', (...args) => this._getOne(...args));
    router.put('/' + this.routeString + '/:id', (...args) => this._update(...args));
    router.delete('/' + this.routeString + '/:id', (...args) => this._delete(...args));
    router.get('/userbids/:email', (...args) => this._getBidsForEmail(...args));
    return router;
  }
  
  
  
}


module.exports = {RFA: RFAController, TeamOwner: TeamOwnerController, Bid: BidController}
