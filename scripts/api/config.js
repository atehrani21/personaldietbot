/**
* Contains api configurations for all apis
*/
var SpotifyWebApi = require('spotify-web-api-node');
module.exports = {
	spotify: new SpotifyWebApi({ //credentials from my spotify app
          clientId : '504e550b118e44189695ba2cabb9ba88',
          clientSecret : '529502e322a946d2a0dfb35ab7f61f0a',
          redirectUri : 'http://localhost:8888/callback'
        })
};
