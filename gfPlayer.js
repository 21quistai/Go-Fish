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

    printPairArmount: function () {
      // prints the amount of pairs each player has
      //definitly could be more efficient
      //TODO: add an id to each for design?
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
      if (player) { // This asks the player who they want to ask for a card
        //console.log('  Who would you like to ask for a card');
        this.choose = player;
        this.checkChooseWho(); //checks to see if it is correct format
        return this.choose;
      } else {
        this.choose = 'player ' + (Math.random() * 4 + 1); // chooses random
        checkChooseWho();
        //This section might be useful for a log
        if (this.choose == 'player 4') choose = 'you'; //displays you for better readability
        console.log('  They asked ' + choose + ' for a ');
        return this.choose;
      }
    },

    checkChooseWho: function () {
      if (this.p) {
        if (this.choose.substring(0, 7) != 'player ') {
          console.log('Did you even read the Instructions?');
          this.chooseWho();
          //checks to see if the first part of the input is 'player'
          //if it isn't than it reruns chooseWho
        } //if

        var i = this.choose.substring(7);
        if (i >= 4) {
          console.log('Thats not a player stupid');
          this.chooseWho();
          //checks the last part of the input to see if it is a number
          // that is a player. if it isn't than it reruns chooseWho
        } //if (i >= 4)
      } else {
        if (this.choose == this.n) {  //if(this.choose.equals(playerName))
          this.choose = 'player ' + (Math.random() * 4 + 1); //asks a random person
        } //if
      } //else
    }, //checkChooseWho

    chooseCard: function (input) { // This is going to have to change to button inputs
      if (player) { // if its the player
        this.choose1 = input;
        return this.choose1;
      } else {
        this.choose1 = (int)(Math.random() * 13 + 1); // asks for a random card
        //console.log(this.choose1);
        return this.choose1;
      } //else
    }, //chooseCard

    checkChooseCard: function () { //likely wont be used
      if (!isNaN(sc)) choose1 = sc; //if the sc scanner isn't a number run again
      else {
        console.log("  Opps! That isn't a card. Try again.");
        chooseCard();

        //If the input isn't a number it reruns
      } //else

      if (choose1 > 13) {
        console.log("  Opps! That isn't a card. Try again.");
        chooseCard();

        //If the input isn't a number 1-13 it reruns
      } //if choose1 > 13
    }, //checkChooseCard

    hasCard: function () {
      for (var i = 0; i < this.hand.length; i++) {
        if (this.hand[i].getValue() == card) {
          return true;

          //Goes through all the cards in the hand
          //and checks to see if it is a match. returns true if there is a match
        } //if
      } //for i

      return false;
    }, //hasCard

    checkForBooks: function () {
      this.hand.sort(); //Doesn't work
      var x;
      //var t = this.getBookCount();//don't need this
      for (var i = 0; i < this.hand.length; i++) { // not sure if this works or not
        for (var j = 0; j < this.hand.length; j++) { //TODO: while loop

          if (i != j && this.getHand()[i].getValue() == this.getHand()[j].getValue()) {
            //// TODO: set variables for this.getHand()[i].getValue() and such
            /*itterates through j and i until the the values of j and i equal each other.
             *When they equal each other, if its the player it removes the buttons
             *It then removes the card from the hand array of everyone and loops over again
             */

            if (this.p) {
              document.getElementById(
                this.getHand()[j].getValue() + this.getHand()[j].getSuit()
              ).remove();
              document.getElementById(
                this.getHand()[i].getValue() + this.getHand()[i].getSuit()
              ).remove();
              /*
              x = document.createElement('span');
              x.innerHTML = 'You had a pair of ' + this.getHand()[i].getValue() + 's';
              document.body.appendChild(x);
              */
            } //if player

            this.hand.splice(j, 1);
            this.hand.splice(i, 1);
            i = 0;
            j = 0;
            this.bookCount++;
          } //if values == each other
        } //for j
      } //for i
    }, //checkForBooks

    sortHand: function () {
      this.hand.sort();//TODO: fix

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

    removeCard: function () {
      if (this.p)  document.getElementById(this.card).remove();
    },//removeCard

    goFish: function (card) {
      this.hand.push(card);
      if (this.p) card.printGFCard();
    }, //goFish

    getHandSize: function () {
      var x = document.getElementById('player-hand-size');
      x.setAttribute('value', 'hi'); //'You have' + this.hand.length + 'cards'
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
