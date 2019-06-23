$(function() {
  function buildHTML(message) {
    var html = `<div class="message">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="lower-meesage">
                    <div class="lower-message__content"></div>
                      ${message.content}
                      ${message.image}
                  </div>
                </div>`
    return html;
  }
  function scroll() {
    $('.messages').animate({scrollTop: $('.message')[0].scrollHeight});
  }
  $('#new_message').on('submit',function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.href 
    $.ajax({
      url: href,
      type: "POST",
      params: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(params){
      var html = buildHTML(params);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      scroll()
    })
    .fail(function() {
      alert('error');
    })
    .always(function() {
      $('.form__message__submit').prop('disabled', false);
    })
  })
});