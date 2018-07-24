var Twitter = require('twitter.js');
 
var client = new Twitter({
  consumer_key: 'NAcgxnp5NL4lgxOUqKEORqD60',
  consumer_secret: 'SSnkbnoJFb1B5mDsSdr9YFgvdpBTMCQL9z4z3uzSjdrxUYZWJW',
  access_token_key: '1020383961007239168-LxpWbFG7RYI1yeITfsp4YunjgY3ncl',
  access_token_secret: 'buJ82aqu7cuHyNJ3b9H6XpxSV7ovv1zHYXwU4WXjy32wn'
});
 
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) 
  {
    console.log(response);
  }
});
