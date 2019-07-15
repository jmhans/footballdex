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
    this.model.find().populate('course').exec(function(err, results) {
      if (err) return next(err);
      res.json(results);
    });
  }
  
//   _createWithSC(req, res, next) {

//     var refSC = []
//     console.log(req.body[0].groups);
//     var grps = req.body[0].groups;
//     var grpArr = []
    
//     for (var g=0; g<grps.length; g++) {
//       if (grps[g].scorecards) {
//         refSC = grps[g].scorecards.map((sc) => {
//           console.log(sc)
//           Scorecard.create(sc, function (err, new_sc) {
//             if (err) return next(err);
//               console.log( new_sc);
//               this._addSCtoGroup(new_sc, grps[g]);
//             return (new_sc._id)
//           })  
//         })
      
//       }
      
//       grps[g].scorecards = refSC;
//       GolfGroup.create(grps[g], function(err, new_grp) {
//         if (err) return next(err);
//         console.log(new_grp);
//         grpArr.push(new_grp._id);
//       })
      
      
//     }
    
//     var createObj = req.body;
//     createObj.groups = grpArr;
    
//     this.model.create(createObj, function (err, post) {
//       if (err) return next(err);
//       res.json(post);
//     });
//   }
  
  _addSCtoGroup(sc, grp) {
    
  }
  
  
  route() {
    router.get('/' + this.routeString, (...args) => this._populatedGet(...args));
    router.post('/' + this.routeString , (...args) => this._create(...args));
    router.get('/' + this.routeString + '/:id', (...args) => this._getOne(...args));
    router.put('/' + this.routeString + '/:id', (...args) => this._update(...args));
    router.delete('/' + this.routeString + '/:id', (...args) => this._delete(...args));
    return router;
  }
}



module.exports = RoundController