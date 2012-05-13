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

  // when the client clicks SEND
  $('#datasend').click(function() {
    var message = $('#data').val();
    $('#data').val('');
    // tell server to execute 'sendchat' and send along one parameter
    socket.emit('sendchat', message);
  });

  // when the client hits ENTER on their keyboard
  $('#data').keypress(function(e) {
    if (e.which == 13) {
      $(this).blur();
      $('#datasend').focus().click();
    }
  });
});