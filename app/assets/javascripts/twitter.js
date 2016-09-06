$(function() {
  $('#twitter_search_button').click(function(){
    $.ajax({
      // url: '/welcome',
      // data: { data: data },
      method: 'GET',
      success: function(data) {
        $('div.response').append("sdajax success");
      },
      error: function(response) {
        $('div.response').append("sdajax error");
      }
    });
  });
});
