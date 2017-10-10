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
                    wins : 0,
                    losses : 0,
                    ties : 0
                  },

                two :
                  {
                    name : '',
                    wins : 0,
                    losses : 0,
                    ties : 0
                  },
              },
        userTurn : 0
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
      renderRockPaperScissors();
      playerOneRef.on('value', function(user){
      var userOneWins = user.val().wins;
      var userOneLosses = user.val().losses;
      $('#playerOne').append('Wins:' + ' ' + userOneWins + ' ' + 'Losses:' + ' ' + userOneLosses);      
      })
    } else {
      alert('Grab a beer and wait your turn!')
    }
})

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

});