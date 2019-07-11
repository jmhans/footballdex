/*jshint esversion: 6 */

const request = require('request');
const ObjectId = require('mongoose').Types.ObjectId;


const Round = require('./../models/round').Round;

const BaseController = require('./base.controller');

class RoundController extends BaseController {

  constructor() {
    super(Round, 'rounds');
  }
}



module.exports = RoundController