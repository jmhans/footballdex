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
}

class TeamOwnerController extends BaseController {

  constructor() {
    super(teamOwner, 'teamowners');
  }
}


module.exports = {RFA: RFAController, TeamOwner: TeamOwnerController}