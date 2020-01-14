
function GFCard(value, suit) {
  return {
    v: value,
    s: suit,
    getValue: function () {
      return value;
    },

    getSuit: function () {
      return suit;
    },

    getName: function () {
      return name;
    },

    printGFCard: function () {
        var x;
        x = document.createElement('BUTTON');//creates a button
        x.setAttribute('type', 'button');
        x.setAttribute('id', this.v + this.s); //sets the Id to the value and suit
        x.setAttribute('class', 'cards'); //puts it in the right space
        x.setAttribute('onclick', 'setCard(this.id)');
        document.getElementById('player-info').appendChild(x);//adds it to player-info
        document.getElementById(this.v + this.s).innerHTML = this.v + this.s;//Displays the text
      }, //printGFCard

    compareCardTo: function () {
      return (this.getValue() < c.getValue() ? -1 :
                    (this.getValue() == c.getValue() ? 0 : 1));
    }, //compareCardTo

  };
}
