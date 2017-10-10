// Wrap jQuery in DOM container
$(document).ready(function() {

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCjNWsgxlV_UMSDWSs3lS6mlOqHKeBjQt4",
    authDomain: "rps-c8817.firebaseapp.com",
    databaseURL: "https://rps-c8817.firebaseio.com",
    projectId: "rps-c8817",
    storageBucket: "rps-c8817.appspot.com",
    messagingSenderId: "962287367701"
  };
  firebase.initializeApp(config);

// Declare gameObject
var gameObject = {
      players : 
              {
                one :
                  {
                    name : '',
                    selection : '',
                    wins : 0,
                    losses : 0,
                    ties : 0
                  },

                two :
                  {
                    name : '',
                    selection : '',
                    wins : 0,
                    losses : 0,
                    ties : 0
                  },
              },
        userTurn : 1
    }

var userCounter = 0;
var database = firebase.database();
var usersRef = database.ref().child('users');
var playerOneRef = usersRef.child('players').child('one');
var playerTwoRef = usersRef.child('players').child('two');

// Store user log-in info
$('#submit').on('click', function(){
  event.preventDefault();
  gameObject.players.one.name = $('#log-in').val().trim();
  userCounter++;
  if(userCounter === 1) {
    var playerOne = gameObject;
    usersRef.set(playerOne);
    $('#playerOne p').empty();
    var playerTwo = gameObject.players.two;
    database.ref().push(gameObject.userTurn);
    playerOneRef.on('value', function(user){
    var userOneName = user.val().name;
    $('#playerOne').append(userOneName);      
})
  } else if(userCounter === 2) {
      // push player two info into firebase
      var playerTwoName = gameObject.players.two.name;
      playerTwoName = $('#log-in').val().trim();
      $('#playerTwo p').empty();
      playerTwoRef.update({
      'name' : playerTwoName
      });
      playerTwoRef.on('value', function(user){
      var userTwoName = user.val().name;
      $('#playerTwo').prepend(userTwoName);
      })
      renderRockPaperScissorsUserOne();
      playerOneRef.on('value', function(user){
      var userOneWins = user.val().wins;
      var userOneLosses = user.val().losses;
      $('#playerOne').append('Wins:' + ' ' + userOneWins + ' ' + 'Losses:' + ' ' + userOneLosses);      
      })
    } else {
      alert('Grab a beer and wait your turn!')
      }
})

function renderRockPaperScissorsUserOne() {
  var html = '';
  html += '<div class="section">'
  html += '<ul class="gameChoices">';
  html += '<li class="choiceOne" value="rock">Rock</li>';
  html += '<li class="choiceOne" value="paper">Paper</li>';
  html += '<li class="choiceOne" value="scissors">Scissors</li>';
  html += '</ul>';
  html += '</div>'
  $('#playerOne').append(html);
}

function renderRockPaperScissorsUserTwo() {
  var html = '';
  html += '<div class="section">'
  html += '<ul class="gameChoices">';
  html += '<li class="choiceTwo" value="rock">Rock</li>';
  html += '<li class="choiceTwo" value="paper">Paper</li>';
  html += '<li class="choiceTwo" value="scissors">Scissors</li>';
  html += '</ul>';
  html += '</div>'
  $('#playerTwo').append(html);
}
// function renderRockPaperScissorsUserTwo() {
//   var html = '';
//   html += '<div class="section">'
//   html += '<ul class="gameChoices">';
//   html += '<li class="choice" value="rock">Rock</li>';
//   html += '<li class="choice" value="paper">Paper</li>';
//   html += '<li class="choice" value="scissors">Scissors</li>';
//   html += '</ul>';
//   html += '</div>'
//   $('#playerOne').append(html);
// }

$(document).on('click', '.choiceOne', function(){
  console.log('CLICKED');
  usersRef.update({
    'userTurn' : 2
  })
  if($(this).attr('value') === 'rock') {
    $('.section').empty();
    $('.section').append('<p>Rock</p>');
    var rock = $(this).attr('value');
    playerOneRef.update({
      'selection' : rock
    });
    userTwoSelection();
  } else if($(this).attr('value') === 'paper') {
     $('.section').empty();
      $('.section').append('<p>Paper</p>');
      var paper = $(this).attr('value');
      playerOneRef.update({
      'selection' : paper
      });
    } else {
      $('.section').empty();
      $('.section').append('<p>Scissors</p>');
      var scissors = $(this).attr('value');
      playerOneRef.update({
      'selection' : scissors
      });
      }
})

$(document).on('click', '.choiceTwo', function(){
  console.log('CLICKED');
  usersRef.update({
    'userTurn' : 3
  })
  if($(this).attr('value') === 'rock') {
    $('.section').empty();
    $('.section').append('<p>Rock</p>');
    var rock = $(this).attr('value');
    playerOneRef.update({
      'selection' : rock
    });
    userTwoSelection();
  } else if($(this).attr('value') === 'paper') {
     $('.section').empty();
      $('.section').append('<p>Paper</p>');
      var paper = $(this).attr('value');
      playerOneRef.update({
      'selection' : paper
      });
    } else {
      $('.section').empty();
      $('.section').append('<p>Scissors</p>');
      var scissors = $(this).attr('value');
      playerOneRef.update({
      'selection' : scissors
      });
      }
})

function userTwoSelection() {
  usersRef.on('value', function(user){
    if(user.val().userTurn === 2) {
      console.log(user.val().userTurn);
      renderRockPaperScissorsUserTwo();
    }
  })
}


});