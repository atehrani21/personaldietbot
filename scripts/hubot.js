var API = require('./api/api');

module.exports = function(robot) {
  var playRegex = /play ([A-Za-z0-9\s]+)/i;
  robot.hear(playRegex, function(msg) {
    API.spotify.playSong(playRegex, msg, function (err, resp) {
      if (err) {
        msg.send("Oh no! Something went wrong with Spotify. Check back in a bit, I'll get on it");
      } else {
        msg.send(resp);
      }
    });
  });
};
