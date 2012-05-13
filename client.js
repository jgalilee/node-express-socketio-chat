var socket = io.connect('http://localhost:3000');

// on connection to server, ask for user's name with an anonymous callback
socket.on('connect', function() {

});

// listener, whenever the server emits 'updatechat', this updates the chat body
socket.on('updatechat', function(username, data) {
  $('#conversation').append('<b>' + username + ':</b> ' + data + '<br>');
});

// listener, whenever the server emits 'updaterooms', this updates the room the client is in
socket.on('updaterooms', function(rooms, current_room) {
  
  // Delete all of the items in the menu
  $('#rooms').empty();

  $.each(rooms, function(key, value) {
    if (value == current_room) {
      $('#rooms').append(
        '<span class="menu-item">' + value + '</span>'
      );
    } else {
      $('#rooms').append(
        '<a href="#" onclick="switchRoom(\'' + value + '\')">' +
          '<span class="menu-item">' + value + '</span>' +
        '</a>'
      );
    }
  });

});

function switchRoom(room) {
  socket.emit('switchRoom', room);
}

// on load of page
$(function() {
  var conversation = $("#conversation");
  // when the client hits ENTER on their keyboard
  $('#footer-chat-message').keypress(function(e) {
    if (e.which == 13) {
      var message = $('#footer-chat-message').val();
      socket.emit('sendchat', message);
      $(this).val('');
      conversation.animate({ scrollTop: conversation.height() }, 1000);
      conversation.animate({})
    }
  });
});