$(function() {

// http://stackoverflow.com/questions/4613310/how-to-call-external-url-in-jquery
var twitterURL="https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=sidazhou";
$.ajax({
    url: twitterURL+"&callback=?",
    type: 'GET',
    success: function (resp) {
        alert(resp);
    },
    error: function(e) {
        alert('Error: '+e);
    }
});


  $('#twitter_search_button').click(function(){
    $.ajax({
      // url: '/welcome',
      // data: { data: data },
      method: 'GET',
      success: function(data) {
        $('div#response').append("sdajax success");
      },
      error: function(response) {
        $('div#response').append("sdajax error");
      }
    });
  });
});

