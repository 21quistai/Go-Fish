import java.util.*;

class Deck{
  //Fields
  ArrayList<GFCard> deck;
  
  //Constructor
  Deck(){
    deck = new ArrayList<GFCard>();
    for(int i = 1; i <= 13; i++){
      deck.add(new GFCard(i,'H'));
      deck.add(new GFCard(i,'C'));
      deck.add(new GFCard(i,'S'));
      deck.add(new GFCard(i,'D'));
    }
    Collections.shuffle(deck);
  }
  
  //Methods
  void printDeck(){
    for(GFCard c : deck) {
      c.printGFCard();
      //System.out.println();
    }
  }
  
  ArrayList<GFCard> getDeck(){
    return deck;
  }
  
  int getSize (){
    return deck.size();
  }
  
  
  void shuffle(){
    Collections.shuffle(deck);
  }
}