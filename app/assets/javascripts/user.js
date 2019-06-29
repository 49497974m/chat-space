$(function() {

  var users_list = $("#user-search-result");
  var selected_list = $('#chat-group-users');

  function appendList(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</div>
                </div>`
    users_list.append(html);
  }

  function appendUser(user_id, user_name) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${ user_id }'>
                  <p class='chat-group-user__name'>${ user_name }</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    selected_list.append(html)
  }

  function appendErrMesgHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ msg }</p>
                </div>`
    users_list.append(html);
  }

  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          appendList(user);
        })
      }
      else {
        appendErrMesgHTML("一致するユーザーはいません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  })
  $("#user-search-result").on("click", ".chat-group-user__btn--add", function() {
    console.log('done')
    var user_id = $(this).data('user-id');
    var user_name = $(this).data('user-name');
    $(this).parent().remove();
    appendUser(user_id, user_name);
  });
    $("#chat-group-users").on("click", ".chat-group-user__btn--remove", function() {
      $(this).parent().remove();
    })
})
