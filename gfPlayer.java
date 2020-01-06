import java.util.*;

class gfPlayer {
  //Fields
  ArrayList<GFCard> hand;

  private int handValue;
  private int bookCount = 0;
  String playerName;
  boolean player;
  boolean turn;

  String choose;// for the player
  int choose1;  // for the card
  Scanner scan = new Scanner (System.in);

  //Constructor
  gfPlayer(boolean p, String n){
    hand = new ArrayList<GFCard>();

    handValue = 0;
    player = p;
    playerName = n;
  }

  //Methods

  //Kinda new
  public void setStartHand(GFCard card){ // This adds a card to the hand at the start
    hand.add(card);
    //GoFish.incrementTopCard();
  }

  //Not new
  public void printHand(){
    if(player){ // prints your hand and how many cards you have
      sortHand();
      System.out.println("You have: " + getHandSize() + " cards, " + bookCount + " books");
      for(GFCard c : hand){
        c.printGFCard();
        System.out.print (", ");
      }
      System.out.println();
    } else if (!player){ // it prints the amount of cards in the hand for "AI" players
      System.out.println(playerName + " has: " + getHandSize() + " cards, " + bookCount + " books" );
    }
  }


  //This is new
  public String chooseWho(){
    if (player){ // This asks the player who they want to ask for a card
      System.out.println ("  Who would you like to ask for a card");
      choose = scan.nextLine().toLowerCase();
      checkChooseWho();
      return choose;
    }else{
      choose = "player " + (int) (Math.random()*4 + 1);// the AI just ask a random person
      checkChooseWho();
      if(choose.equals("player 4")) choose = "you";
      System.out.print("  They asked " + choose + " for a ");
      return choose;
    }
  }

  //This is new
  public int chooseCard(){
    if (player){ // This asks the player what card he wants to ask for
      Scanner sc = new Scanner (System.in); // face cards have to be thier value. I don't know how else to do it
      System.out.println ("  What card would you like to ask for?");
      choose1 = sc.nextInt();
      return choose1;
    }else{
      choose1 =  (int) (Math.random()*13 + 1) ; // the AI players just ask for a random card
      System.out.print (choose1);
      System.out.println();
      return choose1;
    }
  }

  //This is new
  public boolean hasCard(int card){ // checks to see if the player has the card they want
    for (int i = 0; i<getHandSize(); i++){
      if (hand.get(i).getValue() == card){
        return true;
      }
    }
    return false;
  }

  //This is new
  void checkChooseWho(){
    int i = Integer.parseInt(choose.substring(7));
    if (player){
      if (choose.substring(0,7).equals ("player ")){}
      else {
        System.out.println ("Did you even read the Instructions?");
        choose = scan.nextLine().toLowerCase();
      }
      if (i >= 4){
        System.out.println ("Thats not a player stupid");
        choose = scan.nextLine().toLowerCase();
      }
    }else {
      if (choose.equals(playerName)){
        choose = "player " + (int) (Math.random()*4 + 1);// the AI just ask a random person
      }
    }

  }

  //This is new
  public void checkForBooks(){ // checks to see if you have 2 of the same cards and then removes them
    sortHand();                // A pair is called a book in Go Fish for some unknow reason
    int t = bookCount;
    for (int i = 0; i < getHandSize(); i++){ // not sure if this works or not
      for (int j = 0; j < getHandSize(); j++){
        if (i != j &&getHand().get(i).getValue() == getHand().get(j).getValue()) {
          hand.remove(j);
          hand.remove(i);
          i = 0;
          j = 0;
          bookCount++;
          //if (player && t != bookCount) System.out.println("You got another book");
        }
      }
    }
  }

  //Not my code
  void sortHand(){ //No idea how this works but it does
    Collections.sort (hand, new Comparator<GFCard>(){
      @Override
      public int compare(GFCard card1, GFCard card2){
        Integer x1 = card1.getValue();
        Integer x2 = card2.getValue();
        return  x1.compareTo( x2);
      }
    }
    );
  }

  //Not new
  void goFish(GFCard c){ //This is the same as setStartHand becasue i'm too lazy to go and change it
    hand.add(c); // adds a card to your hand
  }

  //Accessor method
  int getHandSize (){ // gets the number of cards in hand
    return hand.size();
  }

  //Accessor method
  int getBookCount(){
    return bookCount;
  }

  //Accessor method
  public ArrayList<GFCard> getHand(){ // gets the cards in your hand
    return hand;
  }
}
