const defaultOpp = new OppBuilder ('Opponent', -1, 'easterEgg', 'superEasterEgg');
const gameData = new data();
const samson = new OppBuilder('Samson', 1, "\"As long as I have my hair, I fear no one!\"", "Samson says: My hair! My beautiful hair!" );
const goliath =  new OppBuilder('Goliath', 2, '\"No mortal can stand against me! Wait, what are you doing with that sling?\"', "Goliath says: AHH! You shot me right in the eye!" );
const kali = new OppBuilder('Kali', -1, "\"Now I am become death, the destroyer of worlds.\"", "Kali says: I'm melting, I'm melting, MELTING!" );
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

const msgDelay = 100;

//handles the display and function of the mute button and opening screen
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

$(function(){
  $('#rock').on('click', function(){
    rockPaperScissors('r');
  });
  $('#paper').on('click', function(){
    rockPaperScissors('p');
  });
  $('#scissors').on('click', function(){
    rockPaperScissors('s');
  });
});

//handles player entry of data from submit fields
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



//main function that gets called at start of game, determines gamemode
//calls oneTimeBattle or tournamentMode
//takes player input
function rockPaperScissors(input) {
  if(gameData.gameMode === undefined && validate(input, ['q','1','2'] )) {
    delayedMulti(['Ivalid game mode','Choose game mode:','1 - One Time Battle','2 - Tournament','q - to Quit'],0,msgDelay,1,1000);
    return;
  }
  if(gameData.gameMode == undefined) {
    gameData.gameMode = input;
  }
  if(gameData.gameMode === '2'){
    tournamentMode(input);
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
    delayedMulti(['Invalid input.','Best of 3 or 5? or (b) to go back.'], 0,0,1,1000);
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

//main logic for a round of rps
//takes player input
function oneTimeBattle(input) {
  let result;
  if(gameData.bestOf === '3'){
    gameData.winningScore = 2;
  }
  
  if(gameData.hasWon === false && gameData.playerThrow === undefined ){
    if(gameData.gameMode == '2'){
    delayedMulti([`                 BEST OF ${gameData.bestOf}       `,`${gameData.playerName}'s Score:${gameData.playerScore} -- ${gameData.currentOpponent.name}'s Score:${gameData.oppScore}`],3400,msgDelay,0,0);
    delayedMulti(['What will you throw? (r)ock, (p)aper, or (s)cissors?'],3700,msgDelay,0,0);
    }else {
    delayedMulti([`                 BEST OF ${gameData.bestOf}       `,`${gameData.playerName}'s Score:${gameData.playerScore} -- ${gameData.currentOpponent.name}'s Score:${gameData.oppScore}`],0,msgDelay,0,0);
    delayedMulti(['What will you throw? (r)ock, (p)aper, or (s)cissors?'],200,msgDelay,0,0);
    }
    gameData.playerThrow = '0';
    return true;
  }else if(gameData.hasWon === false && gameData.playerThrow == '0' && validate(input, ['R','P','S','r','p','s','+','-'])) {
    output('Enter a vaild throw: r, p, or s');
    return true;
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
    delayedMulti([`                 BEST OF ${gameData.bestOf}       `,`${gameData.playerName}'s Score:${gameData.playerScore} -- ${gameData.currentOpponent.name}'s Score:${gameData.oppScore}`],3400,msgDelay,0,0);
    delayedMulti(['YOU LOST THE MATCH!'],3700,msgDelay,0,0)
    delayedMulti([gameOverPhrase()],4000,msgDelay,0,0)
    setTimeout(function(){
      output('Press Submit/Enter to play again!');
    },6000);
    gameData.isGameOver = true;
    return false;
  }else if(gameData.playerScore === gameData.winningScore && gameData.currentOpponent.name !== 'Kali'){
    gameData.hasWon = true;
    delayedMulti([`                 BEST OF ${gameData.bestOf}       `,`${gameData.playerName}'s Score:${gameData.playerScore} -- ${gameData.currentOpponent.name}'s Score:${gameData.oppScore}`],3400,msgDelay,0,0);
    delayedMulti([`You won the match!!! Congratulations ${gameData.playerName}!!!`,`Are you ready for a harder opponent?`],3700,msgDelay,0,0);
    delayedMulti([gameData.currentOpponent.taunt('lose')],4700,msgDelay,0,0);

    if(gameData.currentOpponent === defaultOpp){
      setTimeout(function(){
        output('Press Submit/Enter to play again!');
      },5700);
      gameData.isGameOver = true;
    }
    if(gameData.gameMode == '2') {
        gameData.firstFight = true;
        gameData.round++;
        gameData.playerScore = 0;
        gameData.oppScore = 0;
        gameData.hasWon = false;
        gameData.playerThrow = undefined;
        setTimeout(function(){
          tournamentMode();
        },6700);
    }
    return true;
  }else if (gameData.playerScore === gameData.winningScore && gameData.currentOpponent.name === 'Kali') {
    hasWon = true;
    delayedMulti([`You won the match!!! Congratulations ${gameData.playerName}!!!`],3700,msgDelay,0,0);
    delayedMulti([gameData.currentOpponent.taunt('lose')],4700,msgDelay,0,0);
    delayedMulti(['You won the Tournament of Power!!! You are the strongest in the world... for now.'],7700,msgDelay,0,0);
    gameData.isGameOver = true;
    gameData.hasWonRound = false;
    setTimeout(function(){
      output('Press Submit/Enter to play again!');
      },8700);
    return true;
  }

  delayedMulti([`                 BEST OF ${gameData.bestOf}       `,`${gameData.playerName}'s Score:${gameData.playerScore} -- ${gameData.currentOpponent.name}'s Score:${gameData.oppScore}`],3400,msgDelay,0,0);
  delayedMulti(['What will you throw? (r)ock, (p)aper, or (s)cissors?'],3700,0,0,0);
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
    delayedOutput([`${opponentName} threw Rock!!!`],1000);
    if(playerThrow === 'p') {
      isWinner = true;
    }
  }else if(computerThrow === 1) {
    computerThrow = 'p';
    delayedOutput([`${opponentName} threw Paper!!!`],1000);
    if(playerThrow === 's'){
      isWinner = true;
    }
  }else {
    computerThrow = 's';
    delayedOutput([`${opponentName} threw Scissors!!!`],1000);
    if(playerThrow === 'r') {
      isWinner = true;
    }
  }

  if(computerThrow === playerThrow){
    delayedOutput(['A tie'],2000);
    return
  }
  if(playerThrow == '+'){
    isWinner = true;
  }
  if(playerThrow == '-'){
    isWinner = false;
  }

  if(isWinner){
    delayedOutput(['You won this round!'],2000)
    return 'win';
  }else {
    delayedOutput(['You lost this round!'],2000)
    return 'loss';
  }

}

//run the tourament mode, handles round state and calls tournamentRound function
//takes player input, opp object, and bracket, and passes it on to tournamentRound
function tournamentMode(input){
  if(gameData.playerName === 'Player 1'){
    output('Enter your name: ');
    gameData.playerName = undefined;
    return;
  }else if(gameData.playerName === undefined){
    gameData.playerName = input;
  }
  
  if(true){
    gameData.bestOf = 5;
    if(gameData.round === 1){
      gameData.currentOpponent = samson;
      gameData.updateBrackets();
      gameData.hasWonRound = tournamentRound(1, samson, gameData.bracket1, input);
      return;
      
    }
    if(gameData.round === 2 ) {
      gameData.currentOpponent = goliath;
      gameData.updateBrackets();
      gameData.hasWonRound = tournamentRound(2, goliath , gameData.bracket2, input);
      return;
    }
    if (gameData.round === 3 ) {
      gameData.currentOpponent = kali;
      gameData.updateBrackets();
      gameData.hasWonRound = tournamentRound(3, kali , gameData.bracket3, input);
      return;
      
    }
    if(gameData.round === 4){
      output('You have won the Tournament of Power!!! You are the strongest in the world... for now.');
      gameData.isGameOver = true;
      gameData.hasWonRound = false;
      setTimeout(function(){
        output('Press Submit/Enter to play again!');
      },1500);
    }
  }
}

//prints bracket info, returns oneTimeBattle and passes it player input
//takes as input current round, opp , bracket and player input

function tournamentRound(round, opponent, bracket, input) {
  if(round === 1 && gameData.firstFight){
    multiLine([`ROUND ${round}`,`${bracket[0]}`,`${bracket[1]}`,`${bracket[2]}`,`${bracket[3]}`]);
    console.log(gameData.pName)
  }else if(round === 2 && gameData.firstFight){
    multiLine([`ROUND ${round}`,`${bracket[0]}`,`${bracket[1]}`]);
  }else if(round === 3 && gameData.firstFight){
    multiLine([`ROUND ${round}`,`${bracket[0]}`]);
  }
  if(gameData.firstFight) {
  delayedMulti([`Prepare to battle ${opponent.name}!!!`,`${opponent.name} says:`, opponent.taunt('win')],3000,msgDelay,0,0);
  gameData.firstFight = false;
  }

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

