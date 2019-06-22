$(function() {
  function buildHTML(message) {
    var html = `<div class="message">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.create_at}
                    </div>
                  </div>
                  <div class="lower-meesage">
                    <div class="lower-message__content"></div>
                      ${message.content}
                  </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit',function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = window.location.href + '/messages'
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message').append(html)
      $('.lower-message__content').val('')
    })
  })
});