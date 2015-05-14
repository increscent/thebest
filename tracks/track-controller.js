var Track = require('./track-model');
var Error = require('../error');

module.exports = exports = {
  add: add
};

// add a new track
function add(req, res) {
  var name = req.body.track_name;
  var artist = req.body.artist_name;
  if (!name || !artist) return Error(res, 'USER');

  Track.findOne({name: new RegExp(name, 'i'), artist: new RegExp(artist, 'i')}, function (err, data) {
    if (err) return Error(res, 'DB');
    if (data) {
      data.popularity++;
      data.timestamp = (new Date()).getTime();
    } else {
      data = new Track({
        name: name,
        artist: artist,
        timestamp: (new Date()).getTime()
      });
    }

    data.save( function (err, new_data) {
      res.send(new_data);
    });
  });
}
