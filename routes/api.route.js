var express = require('express');
var router = express.Router();

//const players_controller = require('../controllers/players.controller');

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

var GolfersController = require('../controllers/golfers.controller');

router.use(new GolfersController().route());

module.exports = router;