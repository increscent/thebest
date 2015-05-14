var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/thebest');

// track == song
var TrackSchema = new mongoose.Schema({
  name: String,
  artist: String,
  popularity: {type: Number, default: 1},
  timestamp: Number
});

var Track = mongoose.model('track', TrackSchema);

Track.popular = function (callback) {
  this.find({}, null, {sort: {popularity: -1}}, callback);
};

Track.newest = function (callback) {
  this.find({}, null, {sort: {timestamp: -1}}, callback);
};

Track.random = function (callback) {
  this.count( function (err, count) {
    if (err) return callback(err, undefined);
    var randomDocument = Math.floor(Math.random() * count);
    this.findOne({}, null, {skip: randomDocument}, callback);
  });
};

module.exports = exports = Track;
