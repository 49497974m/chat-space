$(function() {
  function buildMessageHTML(message) {
    var content = message.content ? `${message.content}` : "";
    var image = message.image ? `${message.image}` : "";
    var html = `<div class="message" data-id= ${message.id} >
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-meesage">
                    <div class="lower-message__content">
                      ${content}
                    </div>
                    <img src= "${image}" class="lower-message__image" >
                    </div>
                  </div>`
    return html;
  };

  $('#new_message').on('submit',function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var href = $(this).attr('action')
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(meesages){
      var html = buildMessageHTML(meesages);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function() {
      alert('error');
    })
    .always(function() {
      $('.form__message__submit').prop('disabled', false);
    })
  });

$(function() {
  var reloadMessages = function() {
    if (location.pathname.match(/\/groups\/\d+\/messages/)) {
    last_message_id = $('.message:last').data('id');
    last_message_group_id = $('.left-header__title').data('group-id');
    $.ajax({
      url: `/groups/${last_message_group_id}/api/messages`,
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(meesages) {
      var insertHTML = '';
      meesages.forEach(function(meesage) {
        var html = buildMessageHTML(meesage);
        insertHTML += html
        $('.messages').append(insertHTML);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      })
    })
    .fail(function(){
      alert('自動更新に失敗しました');
    });
    };
  };
  setInterval(reloadMessages, 5000);
});
});
