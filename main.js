var myDeck = new Deck();
var players = [
  new GFPlayer(true, 'player 0'),
  new GFPlayer(false, 'player 1'),
  new GFPlayer(false, 'player 2'),
  new GFPlayer(false, 'player 3'),
];
var turn2 = 0; //global turn variable
var topCard = 0; //The top card in the deck
var card;
var cardt; //temporary card
var player;
var playert; //temporary player

function main() {
  this.startGame();
  this.game();
}

// This does all the stuff that sets the game up  like dealing hands and printing them out
function startGame() {
  console.log("You are playing GO FISH. If you don't know the rules you're stupid");
  console.log('When you ask a player for a card use the format: player #.');
  console.log(
    'When you ask a card from a player use face cards as their number. eg:king = 13.');

  //adds the first 28 cards to everyone so they have 7 cards to start the game
  while (topCard <= 27) {
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
  } //while (topCard <= 27)

  for (var i = 0; i < 4; i++) {
    players[i].checkForBooks();
    players[i].printHandSize();
    players[i].printPairArmount();
  } //for i
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
  card = cardt;
  console.log(player);
  console.log(card);
  if (turn2 == 0)requestWhat(player, card, turn2);
} //enter

function game() {
  while (myDeck.getSize() > 0) {
    for (var turn = 0; turn < 4; turn++) { // cycles through the different players turns
      whosTurn(turn);
      players[turn].checkForBooks();
      if (turn != 0)requestWhat(players[turn].chooseWho(), players[turn].chooseCard(), turn);
      else enter(); //if its the player it uses inputs else it uses random inputs
      checkingForBooks();
      if (turn == 0) {
        for (var i = 0; i < 4; i++) { // prints out everyones hand on the players turn
          players[i].printHandSize();
          players[i].printPairArmount();    //players[i].printHand();
        } //for i
      } //if (turn == 0)

      turn2 = turn;
    } //for turn
  } //while (myDeck.getSize() > 0)
} //game

function whosTurn(player) { // This just says whos turn it is
  if (player == 0) console.log("IT'S YOUR TURN");
  else console.log("IT'S PLAYER " + player + "'S TURN");
} //whosTurn

function requestWhat(who, card, t) {
  for (var i = 0; i < players.length; i++) {
    if (players[i].n == who) { // makes sure i equals the player that is being asked
      if (players[i].hasCard(card)) { // Checks to see if that person has the card
        console.log('They have a: ' + card);//say they have the card
        for (var j = 0; j < players[i].hand.length; j++) {
          // scrolls throught the players hand until it finds the card
          if (players[i].hand[j].getValue() == card) {
            // This is adding the wrong card to the hand
            if (players[i] == players[0]) {
              document.getElementById(players[i].getHand()[j].getValue() + players[i].getHand()[j].getSuit()).remove();
            } //if (players[i] == players[0])

            if (players[t] == players[0]) {
              document.getElementById(players[t].getHand()[j].getValue() + players[t].getHand()[j].getSuit()).remove();
            } //if (players[t] == players[0])

            players[i].hand.splice(j, 1);//removes the card from whoever was aked
            players[t].hand.splice(j, 1);// myDeck.getDeck()[]adds the card to the player who asked
            players[i].printHandSize();
            players[i].printPairArmount();
            players[t].checkForBooks();  // then removes both cards they asked for
            players[t].printHandSize();
            players[t].printPairArmount();
            break;
          } //if (players[i].hand[j].getValue() == card)
        } //for j
      }else {
        console.log("  They didn't have that card.");
        if (players[t].player) console.log('  You drew a: ' + topCard); //This is broken
        players[t].goFish(myDeck.getDeck()[topCard]); //Adds a card to whoevers turn it was
        topCard++;
        players[t].printHandSize();
        players[t].printPairArmount();
        players[t].checkForBooks();  //checks for books in case the new card is a pair
      } //else
    } //if (players[i].n == who)
  } //for i
} //requestWhat

function reDrawHand(who) { // This gives the player 4 more cards if they run out of cards
  for (var i = 0; i < 4; i++) {
    if (players[i].hand.length == 0) players[who].goFish(myDeck.getDeck()[topCard]);
  } //for i
} //reDrawHand

function printTopCard() {
  //Because this is static it is locking the topcard meaning that you get the same card
  var c = myDeck.getDeck().get(getTopCard());

  //everytime. It needs to be non-static but then it doesn't work
  return c.getName() + c.getSuit();
} //printTopCard

function getTopCard() { // accessor method
  return topCard;
} //getTopCard

function incrementTopCard() {
  return topCard++;
} //incrementTopCard

main();
