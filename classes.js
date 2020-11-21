
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
  this.bracket1 = [
    [`${this.playerName} vs ${this.currentOpponent.name}`],
    [`Gilgamesh vs Golith`],
    [`Kronos vs Zeus`],
    [`Marduk vs Kali`]
  ],
  this.bracket2 = [ 
    [`${this.playerName} vs ${this.currentOpponent.name}`],
    [`Kronos vs Kali`]
  ],
  this.bracket3 = [
    [`${this.playerName} vs ${this.currentOpponent.name}`]
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
  }
}

