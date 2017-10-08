$(document).ready(function() {

  var config = {
    apiKey: "AIzaSyCjNWsgxlV_UMSDWSs3lS6mlOqHKeBjQt4",
    authDomain: "rps-c8817.firebaseapp.com",
    databaseURL: "https://rps-c8817.firebaseio.com",
    projectId: "rps-c8817",
    storageBucket: "rps-c8817.appspot.com",
    messagingSenderId: "962287367701"
  };
  firebase.initializeApp(config);
var database = firebase.database();
var playerOne = {
          name : '',
          losses : 0,
          wins : 0,
          ties : 0
}

var playerTwo = {
          name : '',
          wins : 0,
          losses : 0,
          ties : 0
}

var turn = 0;
var searchCounter = 0;

$('#submit').on('click', function() {
  event.preventDefault();
  searchCounter++;
  if(searchCounter === 1) {
    console.log("THIS SHOULD BE 1", searchCounter)
    playerOne.name = $('#log-in').val().trim();
    database.ref().push(playerOne);
  } else if(searchCounter === 2) {
    console.log("THIS SHOULD BE 2", searchCounter);
    playerTwo.name = $('#log-in').val().trim();
    database.ref().push(playerTwo);
    $('#playerOne p').empty();
    renderRockPaperScissors();
  } else {
    console.log("THIS SHOULD BE > 2");
    alert("Grab yourself a beer and please wait until the current game is over.")
    return;
  } 
})

function renderRockPaperScissors() {
  var html = '';
  html += '<ul class="gameChoices">';
  html += '<li>Rock</li>';
  html += '<li>Paper</li>';
  html += '<li>Scissors</li>';
  html += '</ul>';
  $('#playerOne').html(html);
  html.css('list-style-type', 'none');
}

}) 

// Add choices to player one div
// Add 1 to turn
// Highlight player one div
