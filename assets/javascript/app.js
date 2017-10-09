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

var gameObject = {
playerOne : {
          name : '',
          losses : 0,
          wins : 0,
          ties : 0,
          gameTurn : false
},
playerTwo : {
          name : '',
          wins : 0,
          losses : 0,
          ties : 0,
          gameTurn : false
},
turn : 0
}

var searchCounter = 0;

$('#submit').on('click', function() {
  event.preventDefault();
  searchCounter++;
  if(searchCounter === 1) {
    console.log("THIS SHOULD BE 1", searchCounter)
    gameObject.playerOne.name = $('#log-in').val().trim();
    database.ref().push(gameObject.playerOne);
    database.ref().push(gameObject.turn);
    $('#playerOne p').empty();
    renderPlayerOneName();
  } else if(searchCounter === 2) {
    console.log("THIS SHOULD BE 2", searchCounter);
    gameObject.playerTwo.name = $('#log-in').val().trim();
    database.ref().push(gameObject.playerTwo);
    console.log(gameObject.playerOne.name);
    renderRockPaperScissors();
    renderPlayerOneUserRecord();
    changeTurn();
    console.log('THIS SHOULD BE TURN 1', gameObject.turn)
  } else {
    console.log("THIS SHOULD BE > 2");
    alert("Grab yourself a beer and please wait until the current game is over.")
    return;
  } 
})

function renderPlayerOneName() {
  var html = '';
  html += `<p>${gameObject.playerOne.name}</p>`;
  $('#playerOne').prepend(html);
}

function renderRockPaperScissors() {
  var html = '';
  html += '<div class="section">'
  html += '<ul class="gameChoices">';
  html += '<li class="choice" value="rock">Rock</li>';
  html += '<li class="choice" value="paper">Paper</li>';
  html += '<li class="choice" value="scissors">Scissors</li>';
  html += '</ul>';
  html += '</div>'
  $('#playerOne').append(html);
  // $('.gameChoices').css('list-style-type', 'none');
}

function changeTurn() {
  gameObject.turn++;
}

function renderPlayerOneUserRecord() {
  var html = '';
  html += `<p>Wins: ${gameObject.playerOne.wins}</p>`
  html += `<p>Losses: ${gameObject.playerOne.losses}</p>`
  $('#playerOne').append(html);
}

$(document).on('click', '.choice', function(){
  console.log('CLICKED');
  console.log($(this).attr('value'));
  changeTurn();
  if($(this).attr('value') === 'rock') {
    $('.section').empty();
    $('.section').append('<p>Rock</p>');
  } else if($(this).attr('value') === 'paper') {
     $('.section').empty();
      $('.section').append('<p>Paper</p>');
    } else {
      $('.section').empty();
      $('.section').append('<p>Paper</p>');
      }
})

function decidePlayerTurn() {
  if(gameObject.turn > 0 && gameObject.turn % 2 !== 0) {
    gameObject.playerOne.gameTurn = true;
    gameObject.playerTwo.gameTurn = false;
  } else {
    gameObject.playerTwo.gameTurn = true;
    gameObject.playerOne.gameTurn = false;
    } 
}


}) 


