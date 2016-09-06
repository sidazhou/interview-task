$(function() {

// http://stackoverflow.com/questions/4613310/how-to-call-external-url-in-jquery
  $('#twitter_search_button').click(function(){
    var query = $('#twitter_search_query').value;

    $.ajax({
      url: "/show?query=" + query,
      type: 'GET',
      success: function(data) {
        $('div#response').append("sdajax success");
      },
      error: function(response) {
        $('div#response').append("sdajax error");
      }
    });
  });
});

