$(function() {

// http://stackoverflow.com/questions/4613310/how-to-call-external-url-in-jquery
$.ajax({
    url: "/show",
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

