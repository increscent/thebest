var router = require('express').Router();
var Track = require('./tracks/track-model');


router.get('/', function (req, res) {
  res.render('home', {title: 'What\'s your favorite song?'});
});

router.get('/popular', function (req, res) {
  Track.popular( function (err, data) {
    if (err) return Error(res, 'DB');
    res.render('list', {tracks: data, title: 'Popular'});
  });
});

router.get('/newest', function (req, res) {
  Track.newest( function (err, data) {
    if (err) return Error(res, 'DB');
    res.render('list', {tracks: data, title: 'Newest'});
  });
});

router.get('/random', function (req, res) {
  Track.random( function (err, data) {
    if (err) return Error(res, 'DB');
    res.render('single', {track: data.name, artist: data.artist, popularity: data.popularity, title: 'Random'});
  });
});

module.exports = exports = router;
