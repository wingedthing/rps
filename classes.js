class OppBuilder {
  constructor(name, behavior, catchPhrase, losingPhrase) {
    this._name = name;
    this._behavior = behavior;
    this._winning = catchPhrase;
    this._lose = losingPhrase;
  }
  get name() {
    return this._name;
  }
  get behavior() {
    return this._behavior;
  }
  taunt(value) {
    if(value === 'win'){
      output(this._winning);
    }else if(value ==='lose') {
      output(this._lose);
    }
  }
}

class data{
  constructor() {
  this.playerName = 'Player 1';
  this.currentOpponent = defaultOpp;
  this.gameMode = undefined;
  this.bestOf = undefined;
  this.playerScore = 0;
  this.oppScore = 0;
  this.winningScore = 3;
  this.round = 1;
  this.hasWon = false;
  this.currentBracket = undefined;
  this.playerThrow = undefined;
  this.isGameOver = false;
  this.hasWonRound = true;
  this.throwPhraseCounter = 0;
  this.firstFight = true;
  this.bracket1;
  this.bracket2;
  this.bracket3;
  }

  get pName() {
    return this.playerName;
  }

  get oName() {
    return this.currentOpponent.name
  }

updateBrackets(){
    this.bracket1 = [
      [`${this.pName} vs ${this.oName}`],
      [`Gilgamesh vs Golith`],
      [`Kronos vs Zeus`],
      [`Marduk vs Kali`]
    ],
    this.bracket2 = [ 
      [`${this.pName} vs ${this.oName}`],
      [`Kronos vs Kali`]
    ],
    this.bracket3 = [
      [`${this.pName} vs ${this.oName}`]
    ]
  }
  
  reset() {
  this.playerName = 'Player 1';
  this.currentOpponent = defaultOpp;
  this.gameMode = undefined;
  this.bestOf = undefined;
  this.playerScore = 0;
  this.oppScore = 0;
  this.winningScore = 3;
  this.round = 1;
  this.hasWon = false;
  this.currentBracket = undefined;
  this.playerThrow = undefined;
  this.isGameOver = false;
  this.hasWonRound = true;
  this.throwPhraseCounter = 0;
  this.firstFight = true;
  }
}

function gameOverPhrase() {
  const arr = [
    'You lost and your life has no meaning!!',
    'Is that the best you can do? Pathetic!',
    'Nice try.......Not!',
    'Maybe someday you\'ll get good?',
    'HAHAHAHAAHAH...loser.',
    'This is a special easter egg msg! Only the dumbest players get to see it!',
    'You should be ashamed of yourself.',
    'GAME.....OVERRRRRR!!!',
    'You think this is a game?! Well, guess what? You just lost.',
    'Your twisted and ruined body goes down in a hail of bullets...',
    'In Rock Paper Scissors Royale you win, or you die.',
    'Shame, Shame, Shame...',
    'Time to eat your feelings!'
  ];
  output(arr[Math.floor(Math.random() * arr.length)]);
}

function preThrowPhrase() {
  const arr = [
    "You ready yourself, The referee counts down \"3, 2, 1 THROW!\"",
    'You feel your power rising, The referee counts down \"3, 2, 1 THROW!\"',
    'You must go beyond! The referee counts down \"3, 2, 1 THROW!\"',
    'It\'s now or never, The referee counts down \"3, 2, 1 THROW!\"',
    'You unleash your full fury! The referee counts down \"3, 2, 1 THROW!\"'
  ];
  if(gameData.throwPhraseCounter > 4) gameData.throwPhraseCounter = 0;
  output(arr[gameData.throwPhraseCounter]);
  gameData.throwPhraseCounter++;
}

