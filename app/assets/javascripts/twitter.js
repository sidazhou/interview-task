var tweets; // global var
var tweets_shown; // global var


$(function() {
  // TODO: auto refresh at interval
  query_twitter('salesforce');

  $('#tweet_filter_query').keyup(function(){
    var str_filter_query = $('#tweet_filter_query').val();

    tweets_shown = _.filter(tweets, function(el) { return el.text.includes(str_filter_query) })

    var html_blob = highlight_html(build_html(tweets_shown), str_filter_query)
    update_response(html_blob);
  })

});


var highlight_html = function(html_blob, highlight_str) {
  if ( highlight_str=='' ) {
    return html_blob;
  }

  // crafted by a regex wizard using regex lookahead
  var regex = new RegExp('(?![^<>]*>)(' + highlight_str + ')','ig');
  return html_blob.replace(regex, "<span class='highlighted'>$1</span>")
}

var query_twitter = function(str_query) {
  $.ajax({
    url: "/show?query=" + str_query,
    type: 'GET',
    success: function(data) {
      tweets = _.first(data.tweets, 10)
      tweets_shown = tweets

      update_response(build_html(tweets_shown));
    },
    error: function(response) {
      alert(response);
    }
  });
}

var update_response = function(html_blob) {
  $('div#response').html(html_blob);
}

var build_html = function (tweets) {

  var lis = tweets.map( function(tweet) {
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
  }).join('')

  return `<ul class="list-group">
            ${lis}
          </ul>`
}



