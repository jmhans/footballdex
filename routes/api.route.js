var express = require('express');
var router = express.Router();

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
 // console.log('Time: ', Date.now());
  next();
});


var RFAController = require('../controllers/rfa.controller').RFA;
var TeamOwnerController = require('../controllers/rfa.controller').TeamOwner;

router.use(new RFAController().route());
router.use(new TeamOwnerController().route());


module.exports = router;
