import java.lang.Math;
import java.util.*;

class GoFish {
  
  public static Deck myDeck = new Deck ();
  public static gfPlayer players []  = { //
    new gfPlayer (true,  "you"),
    new gfPlayer (false, "player 1"),
    new gfPlayer (false, "player 2"),
    new gfPlayer (false, "player 3")};
  private static int turn2;// This is what it should be (int) (Math.random()*4 + 1);. 4 is just so it goes to the player first
  // I honestly forgot why I have a turn and a turn2
  private static int topCard = 0; // Used to draw the top card of the pile
  public static void main (String args []){
    startGame();
    reDrawHand(turn2);
    game();
  }
  
  //This is new
  private static void startGame (){ // This does all the stuff that sets the game up  like dealing hands and printing them out
    System.out.println ("You are playing GO FISH. If you don't know the rules you're stupid");
    System.out.println ("When you ask a player for a card use the format: player #.");
    System.out.println ("When you ask a card from a player use face cards as their number. eg: king = 13. If you type something other than a number you will break the game");
    
    while (getTopCard() <= 27){ //adds the first 28 cards to everyone so they have 7 cards to start the game
      if (getTopCard() <= 6) players[0].setStartHand (myDeck.getDeck().get(topCard));
      else if (getTopCard() >= 7 && topCard <= 13) players[1].setStartHand (myDeck.getDeck().get(getTopCard()));
      else if (getTopCard() >= 14 && topCard <= 20) players[2].setStartHand (myDeck.getDeck().get(getTopCard()));
      else if (getTopCard() >= 21 && topCard <= 27) players[3].setStartHand (myDeck.getDeck().get(getTopCard()));
      topCard++;
    }
    for (int i = 0; i < 4; i ++){
      players[i].checkForBooks();
      players[i].printHand();
    }
  }
  
  //This is new
  static void game (){
    while (myDeck.getSize() > 0){ // This could also be replaced with a done boolean to make the game longer
      for (int turn = 0; turn < 4; turn++){ // cycles through the different players turns
        whosTurn(turn);
        players[turn].checkForBooks();
        requestWhat(players[turn].chooseWho(),players[turn].chooseCard(), turn);
        checkingForBooks();
        if (turn == 3){
          for (int i = 0; i < 4; i ++){ // prints out everyones hand on the players turn
            players[i].printHand();     // So the console gets less crowded
          }
        }
        turn2 = turn;
      }
    }
  }
  
  //This is new
  private static void whosTurn(int player){ // This just says whos turn it is
    if (player == 0) System.out.println ("IT'S YOUR TURN");
    else System.out.println ("IT'S PLAYER " + player + "'S TURN");
  }
  
  //This is new
  private static void requestWhat(String who, int card, int  t){
    for(int i = 0; i < players.length; i ++){
      if (players[i].playerName.equals(who)){ // This makes makes sure that i is the right person is being asked
        if (players[i].hasCard(card)){ // Checks to see if that person has the card
          System.out.println ("  They have a: " + card); 
          for (int j = 0; j < players[i].getHandSize(); j++){
            if (players[i].hand.get(j).getValue() == card){   // This is adding the wrong card to the hand
              players[t].hand.add(myDeck.getDeck().get(j));   //adds the card to whoevers turn it is
              players[t].checkForBooks();                     //checkForBooks() removes the pair
              players[i].hand.remove(myDeck.getDeck().get(j));//removes the card from whoever was aked
              break;
            }
          }
        }else {
          System.out.println ("  They didn't have that card.");
          if (players[t].player) System.out.println ("  You drew a: " + printTopCard() ); //This is broken
          players[t].goFish(myDeck.getDeck().get(getTopCard())); //Adds a card to whoevers turn it was
          topCard++;                                             //pretty sure its adding the wrong card
          players[t].checkForBooks();                            //checks for books in case the new card is a pair
          //players[t].printHand();                               
          // This should be a function that adds the card to the person that asked 
          //and removes it from the person they asked from
        }
        
      }
    }  
  }
  
  public static void checkingForBooks(){ // pretty sure this is useless
    for (int i = 0; i<=3; i ++){         // I wanted it to always be checking for books but then it doesn't do anything else
      players[i].checkForBooks();
    }
  }
  static void reDrawHand(int who){ // This gives the player 4 more cards if they run out of cards
    for (int i = 0; i < 4; i++){
      players[who].goFish(myDeck.getDeck().get(getTopCard()));
    }
  }
  static String printTopCard(){ //Because this is static it is locking the topcard meaning that you get the same card                             
    GFCard c = myDeck.getDeck().get(getTopCard()); //everytime. It needs to be non-static but then it doesn't work
    return c.getName() + c.getSuit();
  }
  
  public static int getTopCard(){ // accessor method
    return topCard;
  }
  
  public static int incrementTopCard(){
    return topCard++;
  }
  
  
  /*
   *       if (turn == 1){        //  p1
   whosTurn(1);
   players[0].checkForBooks();
   requestWhat(players[0].chooseWho(),players[0].chooseCard(), turn);
   checkingForBooks();
   players[0].printHand();
   turn = 2;
   } else if (turn == 2){ //  p2
   whosTurn(2);
   players[1].checkForBooks();
   requestWhat(players[1].chooseWho(),players[1].chooseCard(), turn);
   players[1].checkForBooks();
   players[1].printHand();
   turn = 3;
   } else if (turn == 3){ //  p3
   whosTurn(3);
   players[2].checkForBooks();
   requestWhat(players[2].chooseWho(),players[2].chooseCard(), turn);
   players[2].checkForBooks();
   players[2].printHand();
   turn = 4;
   } else if (turn == 4){ // main
   whosTurn(4);
   players[3].checkForBooks();
   players[3].printHand();
   requestWhat(players[3].chooseWho(),players[3].chooseCard(), turn - 1);
   players[3].checkForBooks();
   players[3].printHand();
   turn = 1;
   }
   */
  
  
  
  
}