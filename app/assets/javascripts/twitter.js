var tweets; // global var
var tweets_shown; // global var

$(function() {
  query_twitter('salesforce');

  $('#tweet_filter_query').keyup(function(){
    var str_filter_query = $('#tweet_filter_query').val()
    tweets_shown = _.filter( tweets, function(el) { return el.text.includes(str_filter_query) })
    update_response(tweets_shown);
  })

});

var query_twitter = function(str_query) {
  $.ajax({
    url: "/show?query=" + str_query,
    type: 'GET',
    success: function(data) {
      tweets = _.first(data.tweets, 10)
      tweets_shown = tweets

      update_response(tweets_shown);
    },
    error: function(response) {
      update_response(null);
    }
  });
}

var update_response = function(tweets) {
  // if error
  // $('div#response').html("user " + str_query + " not found");
  // return

  var html_tweets = tweets.map( function(tweet) {
     return "<p>" + tweet.text + "</p>";
  })

  $('div#response').html(html_tweets);
}
