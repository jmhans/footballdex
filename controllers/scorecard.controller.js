/*jshint esversion: 6 */

const request = require('request');
const ObjectId = require('mongoose').Types.ObjectId;


const Scorecard = require('./../models/round').Scorecard;

const BaseController = require('./base.controller');

class ScorecardController extends BaseController {

  constructor() {
    super(Scorecard, 'scorecards');
  }
}



module.exports = ScorecardController