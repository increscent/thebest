var express = require('express');
var router = express.Router();
var trackRoutes = require('./tracks');
var viewRoutes = require('./view-routes');

router.use('/tracks', trackRoutes);
router.use('/', viewRoutes);

module.exports = exports = router;
