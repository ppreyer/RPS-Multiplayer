$(document).ready(function() {

var config = {
    apiKey: "AIzaSyCjNWsgxlV_UMSDWSs3lS6mlOqHKeBjQt4",
    authDomain: "rps-c8817.firebaseapp.com",
    databaseURL: "https://rps-c8817.firebaseio.com",
    projectId: "rps-c8817",
    storageBucket: "",
    messagingSenderId: "962287367701"
  };
  firebase.initializeApp(config);

var database = firebase.database();
var playerOne;
var playerTwo;

// When an input is entered...
// Create a new player in Google Firebase

$('#click-button').on('click', function() {
  var userNameInput = $('#user-name-input').val();
  database.ref().set({
    player : userNameInput
  });
});

database.ref().on('value', function(snapshot) {
  console.log(snapshot.val());
  $("#player-one").html(snapshot.val().player);
  playerOne = snapshot.val().userNameInput;
}, function(errorObject) {
  console.log('The read failed: ' + errorObject.code);
});

});

