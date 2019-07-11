/*jshint esversion: 6 */

const request = require('request');
const ObjectId = require('mongoose').Types.ObjectId;


const Course = require('./../models/course');

const BaseController = require('./base.controller');

class CourseController extends BaseController {

  constructor() {
    super(Course, 'courses');
  }
}



module.exports = CourseController