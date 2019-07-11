/*jshint esversion: 6 */

const request = require('request');
const ObjectId = require('mongoose').Types.ObjectId;


const golfGroup = require('./../models/round').Group;

const BaseController = require('./base.controller');

class GroupController extends BaseController {

  constructor() {
    super(golfGroup, 'golf-groups');
  }
}



module.exports = GroupController