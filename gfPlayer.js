function GFPlayer(player, playerName) {
  return {
    hand: [],
    handValue: 0,
    p: player,
    n: playerName,
    choose1: 0, //card
    choose: '', //player
    card: 0,
    bookCount: 0,

    setStartHand: function (card) {
      this.hand.push(card);
      if (this.p)card.printGFCard();
    }, //setStartHand

    printHand: function () { // prints your hand and how many cards you have
      //sort the hand using sortHand();
      // if player show hand size not as a button and cards as buttons
      if (this.p) {
        for (var i = 0; i < this.hand.length; i++) {
          var c = this.hand[i];
          console.log(c);
          this.printHandSize();
          this.printPairArmount();
          c.printGFCard();
        } //for
      } else if (!this.p) { //if not the player
        //TODO: why is this in 2 seperate ifs. have hand size and pair amount no matter what
        this.printHandSize();
        this.printPairArmount();
      } //else if (!this.p)
    }, //printHand

    printHandSize: function () {
      //prints the amount of cards in each players hand
      //definitly could be more efficient
      var x;
      if (this.p) { //player 0
        x = document.getElementById('player-hand-size');
        x.innerHTML = this.hand.length + ' cards ';
        document.getElementById('player-info').appendChild(x);
      }else if (this.n == 'player 1') { //player 1
        x = document.getElementById('player1-hand-size');
        x.innerHTML = this.hand.length + ' cards ';
        document.getElementById('player1-info').appendChild(x);
      }else if (this.n == 'player 2') { //player 2
        x = document.getElementById('player2-hand-size');
        x.innerHTML = this.hand.length + ' cards ';
        document.getElementById('player2-info').appendChild(x);
      }else { //player 3
        x = document.getElementById('player3-hand-size');
        x.innerHTML = this.hand.length + ' cards ';
        document.getElementById('player3-info').appendChild(x);
      } //else
    }, //printHandSize

    printPairArmount: function () { // prints the amount of pairs each player has
      //TODO: add an id to each player for design? back of the card for how many pairs you have?
      var x;
      if (this.p) { //player 0
        x = document.getElementById('player-pair-count');
        x.innerHTML = this.bookCount + ' pairs';
        document.getElementById('player-info').appendChild(x);
      }else if (this.n == 'player 1') { //player 1
        x = document.getElementById('player1-pair-count');
        x.innerHTML =  this.bookCount + ' pairs';
        document.getElementById('player1-info').appendChild(x);
      } else if (this.n == 'player 2') { //player 2
        x = document.getElementById('player2-pair-count');
        x.innerHTML =  this.bookCount + ' pairs';
        document.getElementById('player2-info').appendChild(x);
      }else if (this.n == 'player 3') { //player 3. why is this an if else and not just an else
        x = document.getElementById('player3-pair-count');
        x.innerHTML = this.bookCount + ' pairs';
        document.getElementById('player3-info').appendChild(x);
      }
    },

    chooseWho: function () {
        choose = 'player ' + Math.floor(Math.random() * 4);
        this.checkChooseWho(); //makes sure the player doesn't ask himself for a  card
        return choose;
      },

    checkChooseWho: function () {
        if (choose == this.n) {  //if(this.choose.equals(playerName))
          this.chooseWho();//asks a random person
        } //if
      }, //checkChooseWho

    chooseCard: function () { // This is going to have to change to button inputs
      choose1 = Math.floor(Math.random() * 13 + 1);
      return choose1;
    }, //chooseCard

    checkChooseCard: function () { //checks to see if the input is an actual card
      if (!isNaN(sc)) choose1 = sc; //if the sc scanner isn't a number run again
      else {
        console.log("  Opps! That isn't a card. Try again.");
        chooseCard();
        //If the input isn't a number it reruns
      } //else

      if (choose1 > 13) { //reruns if greater than 13
        console.log("  Opps! That isn't a card. Try again.");
        chooseCard();
      } //if choose1 > 13
    }, //checkChooseCard

    hasCard: function () { //checks to see if there is a match. returns true of there is
      for (var i = 0; i < this.hand.length; i++) {
        if (this.hand[i].getValue() == card) {
          return true;
        } //if
      } //for i

      return false;
    }, //hasCard

    checkForBooks: function () {
      var l; //l for log
      for (var i = 0; i < this.hand.length; i++) {
        for (var j = 0; j < this.hand.length; j++) {
          //TODO: change this to a while loop in case there is a pair with the first number
          // console.log(j + '' + i);
          // console.log(this.getHand()[i].getValue());
          // console.log(this.getHand()[j].getValue());
          if (i != j && this.getHand()[i].getValue() == this.getHand()[j].getValue()) {
            //// TODO: set variables for this.getHand()[i].getValue() and such?
            //removes the card buttons \/
            if (this.p) {
              document.getElementById(
                this.getHand()[j].getValue() + this.getHand()[j].getSuit()
              ).remove();
              document.getElementById(
                this.getHand()[i].getValue() + this.getHand()[i].getSuit()
              ).remove();

              //logs that you got a pair \/
              l = document.createElement('p');
              l.innerHTML = 'You got a pair of ' + this.getHand()[i].getValue() + 's';
              l.scrollTop = l.scrollHeight;
              document.getElementById('log').appendChild(l);
            } //if player

            this.hand.splice(j, 1);  //removes the pair
            this.hand.splice(i, 1);  //removes the pair
            i = 0; //sets it back in case there are more than 1 pair
            j = -1; //-1 because it will increase back to 0 before it loops again. makes sure
            this.bookCount++;
          } //if values == each other
        } //for j
      } //for i
    }, //checkForBooks

    sortHand: function () {
      //this.hand.sort();

      //TODO: find a way to sort the hand
      /* this is the old code
      Collections.sort (hand, new Comparator<GFCard>(){
        @Override
        public int compare(GFCard card1, GFCard card2){
          Integer x1 = card1.getValue();
          Integer x2 = card2.getValue();
          return  x1.compareTo( x2);
          }
        }
      );
      */
    }, //sortHand

    removeCard: function () { //// TODO: Useless? yes
      if (this.p)  document.getElementById(this.card).remove();
    },//removeCard

    goFish: function (card) { //adds the card to the players hand then displays it
      this.hand.push(card);
      if (this.p) card.printGFCard();
    }, //goFish

    getHandSize: function () { //Useless? same as printHandSize?
      var x = document.getElementById('player-hand-size');
      x.setAttribute('value', 'hi');
      document.body.appendChild(x);
    }, //getHandSize

    getBookCount: function () {
      return this.bookCount;
    }, //getBookCount

    getHand: function () {
      return this.hand;
    }, //getHand

  }; //return
} //function
