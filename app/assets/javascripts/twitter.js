var tweets; // global var
var tweets_shown; // global var

$(function() {
  // TODO: think about what happens when the user is using the filter and refresh happens, one solution: setup a flag to prevent update if input field is not empty
  query_twitter_reoccur();

  $('#tweet_filter_query').keyup(handle_keyup);

});


// API related
var query_twitter_reoccur = function() {
  query_twitter('salesforce');
  var i = setInterval(function(){
      query_twitter('salesforce');
  }, 60*1000);
}

var query_twitter = function(str_query) {
  console.log('pinging twitter server...');

  $.ajax({
    url: "/show?query=" + str_query,
    type: 'GET',
    success: function(data) {
      handle_success(data);
    },
    error: function(response) {
      alert(response);
    }
  });
}


// event handlers
var handle_success = function(data) {
  tweets = _.first(data.tweets, 10);
  tweets_shown = tweets;
  render(build_html(tweets_shown));
}

var handle_keyup = function(){
  var str_query = $('#tweet_filter_query').val();

  // mutes global tweets_shown
  filter_tweets(tweets, str_query);

  var html_blob = highlight_html(build_html(tweets_shown), str_query);
  render(html_blob);
}


// html renders
var render = function(html_blob) {
  $('div#response').html(html_blob);
}

var highlight_html = function(html_blob, highlight_str) {
  if ( highlight_str=='' ) {
    return html_blob;
  }

  // crafted by a regex wizard using regex lookahead
  var regex = new RegExp('(?![^<>]*>)(' + highlight_str + ')','ig');
  return html_blob.replace(regex, "<span class='highlighted'>$1</span>");
}

var build_html = function (tweets) {
  var lis = tweets.map(build_html_widget).join('')

  return `<ul class="list-group">
            ${lis}
          </ul>`
}

var build_html_widget = function(tweet) {
     // ES6 syntax
     return `<li class='list-group-item'>
                <div class="row">
                  <div class="col-md-2">
                    <img src=${tweet.user.profile_image_url} align='right'/>
                  </div>

                  <div class="col-md-10 tweet-body">
                    <div class="row">
                      <span class='name'> ${tweet.user.name} </span>
                      <span class='screen-name'> ${'@' + tweet.user.screen_name} </span>
                    </div>

                    <div class="row">
                      ${tweet.text}
                    </div>

                    <div class="row">
                      <span class="glyphicon glyphicon-refresh"></span> ${tweet.retweet_count}
                    </div>
                  </div>
                </div>
              </li>`
}


// getters for testing..
var get_tweets = function() {
  return tweets;
}

var get_tweets_shown = function() {
  return tweets_shown;
}

// mutes global tweets_shown
var filter_tweets = function(tweets, str_query) {
  tweets_shown = _.filter(tweets, function(el) { return el.text.includes(str_query) });
}
