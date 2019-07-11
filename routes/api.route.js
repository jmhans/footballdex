var express = require('express');
var router = express.Router();

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
 // console.log('Time: ', Date.now());
  next();
});

var GolfersController = require('../controllers/golfers.controller');
var RoundController = require('../controllers/round.controller');
var GroupController = require('../controllers/group.controller');
var ScorecardController = require('../controllers/scorecard.controller');
var CourseController = require('../controllers/course.controller');


router.use(new GolfersController().route());
router.use(new RoundController().route());
router.use(new GroupController().route());
router.use(new ScorecardController().route());
router.use(new CourseController().route());


module.exports = router;