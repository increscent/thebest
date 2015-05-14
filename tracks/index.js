var router = require('express').Router();
var trackController = require('./track-controller');

router.post('/', trackController.add);

module.exports = exports = router;
