(function($) {

  $('.connect-facebook-page').on('click', function () {
    $.post('/page/connect/' + $(this).data('page-id'), {
      accessToken: $(this).data('page-access-token')
    }, function(response, status) {
      console.log(response);
      console.log(status);
    })
  })

  $('.disconnect-facebook-page').on('click', function () {
    $.post('/page/disconnect/' + $(this).data('page-id'), {}, function(response, status) {
      console.log(response);
      console.log(status);
    })
  })

})(jQuery)
