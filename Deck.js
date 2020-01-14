function Deck() {
  var deck = [];

  for (var i = 1; i <= 13; i++) {
    deck.push(new GFCard(i, 'H'));
    deck.push(new GFCard(i, 'C'));
    deck.push(new GFCard(i, 'S'));
    deck.push(new GFCard(i, 'D'));
  }

  shuffle(deck);

  return {
    deck: [],
    printDeck: function () {
      //deck.forEach(printGFCard());

      for (var i = 0; i < this.deck.length; i++) {
        var c = this.deck[i];

        //console.log(c);
        c.printGFCard();
      }

      //  for(GFCard c : deck) {   IDK how this works in js
      //        c.printGFCard();
      //
      //      }
    },

    getDeck: function () {
      return deck;
    },

    getSize: function () {
      return deck.legth;
    },

    shuffle: function () {
      shuffle(deck);
    },
  };
}

var shuffle = function (array) {

  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;

};
