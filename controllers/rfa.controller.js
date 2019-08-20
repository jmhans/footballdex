/*jshint esversion: 6 */

const request = require('request');
const ObjectId = require('mongoose').Types.ObjectId;


const rfa = require('./../models/rfa').rfa;
const teamOwner = require('./../models/rfa').teamOwner;

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
  
  
}

class TeamOwnerController extends BaseController {

  constructor() {
    super(teamOwner, 'teamowners');
  }
}


module.exports = {RFA: RFAController, TeamOwner: TeamOwnerController}