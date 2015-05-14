Suggest('track-name', trackSearch, trackSubmit, 3);
Suggest('artist-name', artistSearch, artistSubmit, 5);

function artistSubmit(value) {
  document.querySelector('#artist').value = value;
  document.querySelector('#submit').focus();
}

function artistSearch(value, data_callback) {
  var url = 'https://api.spotify.com/v1/search?q=' + encodeURIComponent(value) + '&type=artist';
  ajax(url, 'GET', function (data) {
    var result = JSON.parse(data);
    if (!result.error) {
      var artists = result.artists.items;
      
      var length = artists.length;
      if (length > 5) length = 5;
      var artist_suggestions = [];
      
      for (var i = 0; i < length; i++) {
        artist_suggestions[i] = artists[i].name;
      }

      return data_callback(artist_suggestions);
    } else {
      return data_callback([]);
    }
  });
}

function trackSubmit(value) {
  var track_artist = value.split(' -- ');
  if (track_artist[1]) {
    document.querySelector('#track').value = track_artist[0];
    document.querySelector('#artist').value = track_artist[1];
    document.querySelector('#submit').focus();
  } else {
    document.querySelector('#artist').focus();
  }
}

function trackSearch(value, data_callback) {
  var url = 'https://api.spotify.com/v1/search?q=' + encodeURIComponent(value) + '&type=track';
  ajax(url, 'GET', function (data) {
    var result = JSON.parse(data);
    if (!result.error) {
      var tracks = top_5(result.tracks.items);
      var suggestions = [];
      
      for (var i = 0; i < tracks.length; i++) {
        suggestions.push(tracks[i].name + ' -- ' + tracks[i].artist);
      }
      
      return data_callback(suggestions);
    } else {
      return [];
    }
  });
}

function top_5(tracks) {
  var top_tracks = [];
  
  while (tracks.length && top_tracks.length < 5) {
    // find the highest popularity track
    largest_index = 0;
    largest_popularity = tracks[0].popularity;
    for (var i = 1; i < tracks.length; i++) {
      if (tracks[i].popularity > largest_popularity) {
        largest_index = i;
        largest_popularity = tracks[i].popularity;
      }
    }
    
    var track = {
      name: tracks[largest_index].name,
      artist: tracks[largest_index].artists[0].name
    };
    tracks.splice(largest_index, 1); // remove the track that was pulled
    
    // make sure the track is not a duplicate
    var duplicate = false;
    for (var i = 0; i < top_tracks.length; i++) {
      if (top_tracks[i].name == track.name && top_tracks[i].artist == track.artist) {
        duplicate = true;
        break;
      }
    }
    
    if (!duplicate) top_tracks.push(track);
  }
  
  return top_tracks;
}

