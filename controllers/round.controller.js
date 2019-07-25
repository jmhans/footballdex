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

    var query = { "groups._id": req.params.grp};
    
    this.model.findOne(query).exec((err, _doc)=> {
      var this_group = _doc.groups.find((grp)=> {return grp._id == req.params.grp})
      var this_golfer = {};
      var this_hole = {};
      for (var g=0; g<req.body.golferScores.length; g++) {
        this_golfer = this_group.scorecards.find((sc) => {return sc.golfer._id == req.body.golferScores[g].golfer._id});
        this_hole = this_golfer.holes.find((hl)=> {return hl.number == req.body.hole});
        this_hole.score = req.body.golferScores[g].score;
      }
      
      
      var gs = this_group.groupScores.find((hl)=> {return (hl.number == req.body.hole)})
      if (!gs) {
        this_group.groupScores.push({number: req.body.hole, score :req.body.groupScore})  ;
      } else {
        gs.score = req.body.groupScore;
      }

      
      

      _doc.save((err, post) => {
        if (err) {
          console.log(err)
          }

        res.json(post)
      })

    })
    
  }
    _updateHoleScores (req, res, next) {
    //assumes [{golfer: {}, score: 2, hole: 3}]

    var query = { "groups.groupScores.holes._id": req.params.holeId};
      
    var findGroupWithHole= (holeId, grps)=> {
      
      for (var g=0; g<grps.length; g++) {
        var found = grps[g].groupScores.find((gs)=> {return gs.hole._id == holeId})
        if (found) {
          return found;
        }
      }
      return null;
    }
      
      
    
    this.model.findById(req.params.id).exec((err, _doc)=> {
      var this_group = findGroupWithHole(req.params.holeId, _doc.groups)
      var gs = this_group.groupScores.find((hl)=> {return (hl.number == req.body.hole)})
      if (!gs) {
        this_group.groupScores.push({number: req.body.hole, net_score :req.body.groupScore})  ;
      } else {
        gs = {number: req.body.hole, par: req.body.par, net_score: req.body.groupScore};
        console.log(gs);
      } 
      
      this_group.totalScore = this_group.groupScores.reduce((retObj, curVal)=> {
        retObj.total += curVal.net_score - curVal.par;
        retObj.thru = Math.max(curVal.number,  retObj.thru);
        return retObj;
      }, 
      {total: 0, thru:0});

            console.log(this_group.totalScore);
      _doc.save((err, post) => {
        if (err) {
          console.log(err)
          }

        res.json(post)
      })

    })
    
  }
  
      _createHoleScore (req, res, next) {
    //assumes [{golfer: {}, score: 2, hole: 3}]

    var query = { "groups._id": req.params.group};
      
    
    this.model.findById(req.params.id).exec((err, _doc)=> {
      var this_group =  _doc.groups.find((grp)=> {return grp._id == req.params.groupId})
      
      var gs = this_group.groupScores.find((hl)=> {return (hl.number == req.body.hole)})
      if (!gs) {
        this_group.groupScores.push({number: req.body.hole, par: req.body.par, net_score :req.body.groupScore})  ;
      } else {
        gs = {number: req.body.hole, par: req.body.par, net_score: req.body.groupScore};

      }
      
      this_group.totalScore = this_group.groupScores.reduce((retObj, curVal)=> {
        console.log(curVal);
        console.log(retObj);
        retObj.total += ((curVal.net_score || 0) - (curVal.par || 0));
        retObj.thru = Math.max((curVal.number || 0),  (retObj.thru || 1));
        return retObj;
      }, 
      {total: 0, thru:0});
            console.log(this_group.totalScore);
      

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
    router.put('/' + this.routeString + '/:id/holescores/:holeId', (...args) => this._updateHoleScores(...args));
    router.post('/' + this.routeString + '/:id/holescores/:groupId', (...args) => this._createHoleScore(...args));
    return router;
  }
}



module.exports = RoundController
