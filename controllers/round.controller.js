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