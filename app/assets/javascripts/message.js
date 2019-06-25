$(function() {
  var buildMessageHTML = function(message) {
    if (message.content && message.image.url) {
      var html = `<div class="message" date-id= ${message.id} >
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                        ${message.date}
                      </div>
                    </div>
                    <div class="lower-meesage">
                    <div class="lower-message__content">
                      ${message.content}
                    </div>
                    <img scr= "${message.image.url}" class="lower-message__image" >
                    </div>
                  </div>`
    } else if (message.content) {
      var html = `<div class="message" date-id= ${message.id} >
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                        ${message.date}
                      </div>
                    </div>
                    <div class="lower-meesage">
                    <div class="lower-message__content">
                      ${message.content}
                    </div>
                    </div>
                  </div>`
    } else if (message.image.url) {
      var html = `<div class="message" date-id= ${message.id} >
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                        ${message.date}
                      </div>
                    </div>
                    <div class="lower-meesage">
                      <img scr= "${message.image.url}" class="lower-message__image" >
                    </div>
                  </div>`
    };
    return html;
  };

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
  };

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
      date: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(meesage){
      var html = buildHTML(meesage);
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

  var reloadMssages = function() {
    last_message_id = $('.message,:last').date('id');
    $.ajax({
      url: '/api/messages',
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(meesages) {
      var insertHTML = '';
      meesages.forEach(function(meesage) {
        buildMessageHTML(meesage);
        var html = buildMessageHTML(meesage);
        insertHTML += html
        $('.message').append(insertHTML);
        $('.message').animate({scrollTop:$('.message').offset().top});
      })
    })
    .fail(function() {
    });
    setInterval(reloadMssages, 5000);
  };
});