/*jshint esversion: 6 */

const request = require('request');
const ObjectId = require('mongoose').Types.ObjectId;
var express = require('express');
var router = express.Router();

const Round = require('./../models/round').Round;
const Scorecard = require('./../models/round').Scorecard;
const GolfGroup = require('./../models/round').Group;
const BaseController = require('./base.controller');

class RoundController extends BaseController {

  constructor() {
    super(Round, 'rounds');
  }
  
    //Simple version, without validation or sanitation
  _populatedGet(req, res, next) {
    this.model.find().populate('course groups.scorecards.golfer').exec(function(err, results) {
      if (err) return next(err);
      res.json(results);
    });
  }
_populatedGetOne(req, res, next) {
  this.model.findById(req.params.id).populate('course groups.scorecards.golfer').exec(function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
}

  _updateScores (req, res, next) {
    //assumes [{golfer: {}, score: 2, hole: 3}]
    const golfer = req.body[0].golfer
    console.log(golfer)
    var query = { "groups._id": req.params.grp};
    
    this.model.findOne(query).exec((err, _doc)=> {
      var this_group = _doc.groups.find((grp)=> {return grp._id == req.params.grp})
      var this_golfer = {};
      var this_hole = {};
      for (var g=0; g<req.body.length; g++) {
        this_golfer = this_group.scorecards.find((sc) => {return sc.golfer._id == req.body[g].golfer._id});
        this_hole = this_golfer.holes.find((hl)=> {return hl.number == req.body[g].hole});
        this_hole.score = req.body[g].score;
      }

      _doc.save((err, post) => {
        if (err) {
          console.log(err)
          }

        res.json(post)
      })

    })
    
  }
  
  
  
  
  
  route() {
    router.get('/' + this.routeString, (...args) => this._populatedGet(...args));
    router.post('/' + this.routeString , (...args) => this._create(...args));
    router.get('/' + this.routeString + '/:id', (...args) => this._populatedGetOne(...args));
    router.put('/' + this.routeString + '/:id', (...args) => this._update(...args));
    router.delete('/' + this.routeString + '/:id', (...args) => this._delete(...args));
    router.put('/' + this.routeString + '/:id/scores/:grp', (...args) => this._updateScores(...args));
    return router;
  }
}



module.exports = RoundController