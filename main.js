var myDeck = new Deck();
var players = [
  new GFPlayer(true, 'player 0'), //main player is player 0
  new GFPlayer(false, 'player 1'),
  new GFPlayer(false, 'player 2'),
  new GFPlayer(false, 'player 3'),
];
var turn2 = 0; //global turn variable / main player is turn = 0 and player 0
var yourTurn;  //pauses program if true continues if false
var topCard = 0; //The top card in the deck
var card;
var cardt; //temporary card
var player;
var playert; //temporary player

function main() {
  this.startGame();
  //this.game();
}

function startGame() {
  //deals everyone their hand and gets rid of any pairs
  while (topCard <= 27) {//deals 7 cards to everyone
    if (topCard <= 6) {
      players[0].setStartHand(myDeck.getDeck()[topCard]);
    }else if (topCard >= 7 && topCard <= 13) {
      players[1].setStartHand(myDeck.getDeck()[topCard]);
    }else if (topCard >= 14 && topCard <= 20) {
      players[2].setStartHand(myDeck.getDeck()[topCard]);
    }else if (topCard >= 21 && topCard <= 27) {
      players[3].setStartHand(myDeck.getDeck()[topCard]);
    }

    topCard++;
  } //while

  for (var i = 0; i < 4; i++) {
    players[i].checkForBooks();
    players[i].printHandSize();
    players[i].printPairArmount();
  } //for (i)
} //startGame

function setCard(input) {
  players[0].card = input;
  cardt = input.substring(0, input.length - 1);
} //setCard

function setPlayer(input) {
  player = input;
  return player;
} //setPlayer

function enter() {
  var l;
  l = document.createElement('p');
  card = cardt;
  if (turn2 == 0) { //makes sure the player doesn't go multiple times in a row
    requestWhat(player, card, 0);
    turn2++;
  }else {
    l.innerHTML = "It's not your turn. press continue";
    document.getElementById('log').scrollTop = document.getElementById('log').scrollHeight;
    document.getElementById('log').appendChild(l);
  }
} //enter

function goOn() { //continue button but continue is taken
  yourTurn = false;
  game();
}

//file:///Users/21quistai/Downloads/GoFish/goFish.html

function game() {
  if (!yourTurn) {
    var turn = 0; // = -1 because turn++ is right away. makes sure turn = 0 & ! 4
    turn2 = turn;
    while (turn < 3) {  // cycles through the different players turns
      if (turn > 0) {
        //turn++;
      }

      turn++;
      whosTurn(turn);
      players[turn].checkForBooks();
      if (turn != 0) { //doesn't pause on 0
        requestWhat(players[turn].chooseWho(), players[turn].chooseCard(), turn);
        if (turn == 3) {
          turn = 0;
          yourTurn = true;
          for (var i = 0; i < 4; i++) { //is this needed? it shoud print everyones hand already
            players[i].printHandSize();// prints out everyones hand on the players turn
            players[i].printPairArmount();
          } //for i
        }

        turn++;
      }
    } //while
  }
} //game

function whosTurn(player) {
  var l;
  l = document.createElement('h4');
  document.getElementById('log').appendChild(l);
  if (player == 0) l.innerHTML = "IT'S YOUR TURN";
  else l.innerHTML = "IT'S PLAYER " + player + "'S TURN";

  //if (player == 0) console.log("IT'S YOUR TURN");
  //else console.log("IT'S PLAYER " + player + "'S TURN");
} //whosTurn

function requestWhat(who, card, t) {
  //who is being asked / card is the card that is being asked for / t is who is asking
  for (var i = 0; i < players.length; i++) {// TODO: useless? substring who and replace i
    if (players[i].n == who) { // makes sure i equals the player that is being asked
      if (players[i].hasCard(card)) { // Checks to see if that person has the card
        console.log('They have a: ' + card);//say they have the card
        printLog(who, card, t, true);
        for (var j = 0; j < players[i].hand.length; j++) {
          // scrolls throught the players hand until it finds the card
          if (players[i].hand[j].getValue() == card) {
            // This is adding the wrong card to the hand
            if (players[i] == players[0]) {
              document.getElementById(players[i].getHand()[j].getValue() + players[i].getHand()[j].getSuit()).remove();
              console.log(players[i].getHand()[j].getValue() + players[i].getHand()[j].getSuit());
            } //if

            if (players[t] == players[0]) {
              document.getElementById(players[t].getHand()[j].getValue() + players[t].getHand()[j].getSuit()).remove();
              console.log(players[t].getHand()[j].getValue() + players[t].getHand()[j].getSuit());
            } //if

            players[i].hand.splice(j, 1);//removes the card from whoever was aked
            players[t].hand.splice(j, 1);// myDeck.getDeck()[]adds the card to the player who asked
            players[i].printHandSize();
            players[i].printPairArmount();
            players[t].printHandSize();
            players[t].printPairArmount();
            players[t].checkForBooks();  // //TODO: useless?
          } //if (players[i].hand[j].getValue() == card)
        } //for j
      }else {
        console.log("  They didn't have that card.");
        if (players[t].p) console.log('  You drew a: ' + topCard); //This is broken
        printLog(who, card, t, false);
        players[t].goFish(myDeck.getDeck()[topCard]); //Adds a card to whoevers turn it was
        players[t].printHandSize();
        players[t].printPairArmount();
        players[t].checkForBooks();  //checks for books in case the new card is a pair
        topCard++;
      } //else
    } //if (players[i].n == who)
  } //for i
} //requestWhat

function printLog(who, card, f, hasCard) {
  //who is who is being asked / card is what card is being asked for
  //f is who who the ask is from. t wasn't working / has card is true if the player has the card
  var l;
  l = document.createElement('p');
  document.getElementById('log').appendChild(l);
  if (f == 0) { // if it's the main player's turn
    l.innerHTML = 'you asked player ' + who + ' for a ' + card;
    l.setAttribute('class', 'player-log');
  } else {
    l.innerHTML = 'player ' + f + ' asked player ' + who + ' for a ' + card;
  }

  l = document.createElement('p');
  document.getElementById('log').appendChild(l);
  if (hasCard == true) {
    l.innerHTML = 'they have that card';
  } else {
    l.innerHTML = 'Go Fish';
  }

  document.getElementById('log').scrollTop = document.getElementById('log').scrollHeight;
}

function reDrawHand(who) { // This gives the player 4 more cards if they run out of cards
  for (var i = 0; i < 4; i++) {
    if (players[i].hand.length == 0) players[who].goFish(myDeck.getDeck()[topCard]);
  } //for i
} //reDrawHand

function printTopCard() { // TODO: Useless?
  var c = myDeck.getDeck().get(getTopCard());
  return c.getName() + c.getSuit();
} //printTopCard

function getTopCard() { // accessor method
  return topCard;
} //getTopCard

function incrementTopCard() {
  return topCard++;
} //incrementTopCard

main(); //this is at the bottom so that everything loads
