const defaultOpp = new OppBuilder ('Opponent', -1, 'easterEgg', 'superEasterEgg');
const gameData = new data();
const samson = new OppBuilder('Samson', 1, "\"As long as I have my hair, I fear no one!\"");
const goliath =  new OppBuilder('Goliath', 2, '\"No mortal can stand against me! Wait, what are you doing with that sling?\"' );
const kali = new OppBuilder('Kali', -1, "\"Now I am become death, the destroyer of worlds.\"");
const msg = {
  two : 'q - to Quit',
  three : '2 - Tournament', 
  four : '1 - One Time Battle',
  five : 'Choose game mode:',
  six : 'text'
}
let onOff = false;
const printHead = ()=>{ 
  multiLine([
  ' ',  
  'Welcome to Mega Rock Paper Scissors Battle Royale!!',
  'Choose game mode:',
  '1 - One Time Battle',
  '2 - Tournament',
  'q - to Quit']);
};

$(function(){
  $('#mute').toggle();
  $('#play').on('click', function(){
    $('#play').toggle();
    $('#audioContainer').toggle();
    printHead();
    $('#mute').toggle();
    $('#field').focus();
  });
  $('#mute').on('click', function(){
    if(onOff){
      document.getElementById('player').play();
      $('#mute').html('Mute')
      onOff = false;
    }else {
      document.getElementById('player').pause();
      $('#mute').html('Unmute')
      onOff = true;
      
    }
  });
});

function enterData(){
  let $playerInput = $('#myform :input').val();
  $('#myform')[0].reset();
  $('#field').focus();
  if(gameData.isGameOver){
    gameData.reset();
    printHead();
      return;
  }
  if($playerInput == '')return
  rockPaperScissors($playerInput);
}


function rockPaperScissors(input) {
  if(gameData.gameMode === undefined && validate(input, ['q','1','2'] )) {
    multiLine(['Ivalid game mode','Choose game mode:','1 - One Time Battle','2 - Tournament','q - to Quit']);
    return;
  }
  if(gameData.gameMode == undefined) {
    gameData.gameMode = input;
  }
  if(gameData.gameMode === '2'){
    output('Tournament Mode coming soon!');
    setTimeout(function(){
      output('Press Submit/Enter to go back');
    },1500);
    gameData.isGameOver = true;
    return;
  }

  if(gameData.gameMode === 'q'){
    location.reload();
    return;
  }

  if(gameData.gameMode === '1' && gameData.bestOf === undefined) {
    output('Best of 3 or 5? or (b) to go back.');
    gameData.bestOf = '0';
    return;
  }else if(gameData.bestOf == '0' && validate(input, ['3','5','b'])) {
    output('Invalid input. Best of 3 or 5? or (b) to go back. ');
    return;
  }else if(gameData.bestOf == '0' && input == 'b'){
    gameData.reset();
    printHead();
    return;
  }else if(gameData.bestOf == '0') {
    gameData.bestOf = input;
  }
  oneTimeBattle(input);
}

function oneTimeBattle(input) {
  let result;
  if(gameData.bestOf === '3'){
    gameData.winningScore = 2;
  }
  
  if(gameData.hasWon === false && gameData.playerThrow === undefined ){
    multiLine([`                 BEST OF ${gameData.bestOf}       `,`${gameData.playerName}'s Score:${gameData.playerScore} -- ${gameData.currentOpponent.name}'s Score:${gameData.oppScore}`]);
    output('What will you throw? (r)ock, (p)aper, or (s)cissors?');
    gameData.playerThrow = '0';
    return;
  }else if(gameData.hasWon === false && gameData.playerThrow == '0' && validate(input, ['R','P','S','r','p','s'])) {
    output('Enter a vaild throw: r, p, or s');
    return;
  }else if(gameData.hasWon === false && gameData.playerThrow == '0') {
    result = oneThrow(input, gameData.currentOpponent.name, gameData.currentOpponent.behavior);
  }

  if(result === 'win') {
    gameData.playerScore++;
  }else if(result === 'loss') {
    gameData.oppScore++;
  }
  
  if(gameData.oppScore === gameData.winningScore){
    gameData.hasWon = true;
    multiLine([`                 BEST OF ${gameData.bestOf}       `,`${gameData.playerName}'s Score:${gameData.playerScore} -- ${gameData.currentOpponent.name}'s Score:${gameData.oppScore}`]);
    output('You lost the match!')
    gameOverPhrase()
    setTimeout(function(){
      output('Press Submit/Enter to play again!');
    },1500);
    gameData.isGameOver = true;
    return false;
  }else if(gameData.playerScore === gameData.winningScore && gameData.currentOpponent.name !== 'Kali'){
    gameData.hasWon = true;
    multiLine([`                 BEST OF ${gameData.bestOf}       `,`${gameData.playerName}'s Score:${gameData.playerScore} -- ${gameData.currentOpponent.name}'s Score:${gameData.oppScore}`]);
    multiLine([`You won the match!!! Congratulations ${gameData.playerName}!!!`,`Are you ready for a harder opponent?`]);
    if(gameData.currentOpponent === defaultOpp){
      setTimeout(function(){
        output('Press Submit/Enter to play again!');
      },1500);
      gameData.isGameOver = true;
    }
    return true;
  }else if (gameData.playerScore === gameData.winningScore && gameData.currentOpponent.name === 'Kali') {
    hasWon = true;
    output(`You won the match!!! Congratulations ${gameData.playerName}!!!`);
    return true;
  }

  multiLine([`                 BEST OF ${gameData.bestOf}       `,`${gameData.playerName}'s Score:${gameData.playerScore} -- ${gameData.currentOpponent.name}'s Score:${gameData.oppScore}`]);
  output('What will you throw? (r)ock, (p)aper, or (s)cissors?');
}

//handles a single throw of rock paper scissors
//takes as input player desision of r,p,s, the enemyName, and opponent behavior
//returns a string value of win or loss, returns nothing for tie
function oneThrow(input, opponentName, behavior){
  let playerThrow = input.toLowerCase();
  let computerThrow;
  
  if(behavior >= 0){
    computerThrow = behavior;
  }else {
    computerThrow = Math.floor(Math.random() * 3);
  }

  let isWinner = false;
  preThrowPhrase();
  
  if(computerThrow == 0){
    computerThrow ='r';
    output(`${opponentName} threw Rock!!!`);
    if(playerThrow === 'p') {
      isWinner = true;
    }
  }else if(computerThrow === 1) {
    computerThrow = 'p';
    output(`${opponentName} threw Paper!!!`);
    if(playerThrow === 's'){
      isWinner = true;
    }
  }else {
    computerThrow = 's';
    output(`${opponentName} threw Scissors!!!`);
    if(playerThrow === 'r') {
      isWinner = true;
    }
  }

  if(computerThrow === playerThrow){
    output('A tie');
    return
  }

  if(isWinner){
    output('You won this round!')
    return 'win';
  }else {
    output('You lost this round!')
    return 'loss';
  }

}

function tournamentMode(input){
  if(gameData.playerName === 'Player 1'){
    output('Enter your name: ');
    gameData.playerName = undefined;
    return;
  }else if(gameData.playerName === undefined){
    gameData.playerName = input;
  }

  if(gameData.hasWonRound){
    gameData.bestOf = 5;
    if(gameData.round === 1){
      gameData.currentOpponent = samson;
      gameData.hasWonRound = tournamentRound(1, samson, gameData.bracket1, input);
      gameData.round++;
      return;
      
    }
    if(gameData.round === 2 && gameData.hasWonRound) {
      gameData.currentOpponent = goliath;
      gameData.hasWonRound = tournamentRound(2, goliath , gameData.bracket2, input);
      gameData.round++
      return;
    }
    if (gameData.round === 3 && gameData.hasWonRound) {
      gameData.currentOpponent = kali;
      gameData.hasWonRound = tournamentRound(3, kali , gameData.bracket3, input);
      gameData.round++
      return;
      
    }
    if(gameData.round === 4 && gameData.hasWonRound){
      output('You have won the Tournament of Power!!! You are the strongest in the world... for now.');
      gameData.isGameOver = true;
      gameData.hasWonRound = false;
      setTimeout(function(){
        output('Press Submit/Enter to play again!');
      },1500);
    }
  }
}

function tournamentRound(round, opponent, bracket, input) {
  if(round === 1){
    multiLine([`ROUND ${round}`,`${bracket[0]}`,`${bracket[1]}`,`${bracket[2]}`,`${bracket[3]}`]);
  }else if(round === 2){
    multiLine([`ROUND ${round}`,`${bracket[0]}`,`${bracket[1]}`]);
  }else if(round === 3){
    multiLine([`ROUND ${round}`,`${bracket[0]}`]);
  }
  multiLine([`Prepare to battle ${opponent.name}!!!`,`${opponent.name} says:`]);
  opponent.taunt('win');
  return oneTimeBattle(input);
}

//displays input text on output div pushing each msg up on each iteration.
function output(input) {
  $('#line6').html(input)
  $('#line5').html(msg.two)
  $('#line4').html(msg.three)
  $('#line3').html(msg.four)
  $('#line2').html(msg.five)
  $('#line1').html(msg.six)
  msg.six = msg.five;
  msg.five = msg.four;
  msg.four = msg.three;
  msg.three = msg.two; 
  msg.two = input;
}

//takes an array with each element being a line of text to be dispayed in the output div
function multiLine(textArr){ 
    textArr.forEach(element =>output(element))
}

//takes a value to be checked against an acceptable array of values.
function validate (actual, expected) {
  for(let el of expected) {
    if(actual === el){
      return false;
    }
  }
  return true;
}

