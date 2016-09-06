$(function() {

// http://stackoverflow.com/questions/4613310/how-to-call-external-url-in-jquery
  $('#twitter_search_button').click(function(){
    var query = $('#twitter_search_query').val();

    $.ajax({
      url: "/show?query=" + query,
      type: 'GET',
      success: function(data) {
        console.log(data);
        $('div#response').html(data["tweet"]);
      },
      error: function(response) {
        $('div#response').html("user " + query + " not found");
      }
    });
  });
});

