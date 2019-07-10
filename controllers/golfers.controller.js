/*jshint esversion: 6 */

const request = require('request');
const ObjectId = require('mongoose').Types.ObjectId;


const Golfer = require('./../models/golfer');
const BaseController = require('./base.controller');

class GolfersController extends BaseController {

  constructor() {
    super(Golfer, 'golfers');
  }
}


module.exports = GolfersController








