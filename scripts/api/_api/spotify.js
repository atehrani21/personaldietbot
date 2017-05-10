var config = require('../config');

module.exports = {
  playSong: function (playRegex, msg, callback) {
    var returnedMessage = '';
    var msgText = msg.message.text;

    var match = playRegex.exec(msgText); //I looked at the structure of msg to find what I wrote to chattybot
    var songName = match[1];
    config.spotify.searchTracks('track:' + songName)
      .then(function(data) {
        var res = data.body;

        if(res.tracks.items.length > 0) {
          returnedMessage = "I found your song! " + res.tracks.items[0].external_urls.spotify;
        } else {
          returnedMessage = "Oh noo, I couldn't find your song! No problemo, just tell me another song.";
        }
        callback(null, returnedMessage);
      }, function(err) {
        callback(err, null);
        console.log('Error in searchTracks!', err);
      });
  }

};
