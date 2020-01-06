class GFCard{
  //Fields aka variables
  private int value;
  private char suit;
  private String name;
  
  //Constructor
  GFCard(int v, char s){
    value = v;
    suit = s;
    if(value == 1) name = "1";
    else if(value == 2) name = "2";
    else if(value == 3) name = "3";
    else if(value == 4) name = "4";
    else if(value == 5) name = "5";
    else if(value == 6) name = "6";
    else if(value == 7) name = "7";
    else if(value == 8) name = "8";
    else if(value == 9) name = "9";
    else if(value == 10) name = "10";
    else if(value == 11) name = "11";
    else if(value == 12) name = "12";
    else name = "13";    
  }
  
  //Methods aka functions
  int getValue(){
    return value;
  }
  
  //This gets the suit of the card
  char getSuit(){
    return suit;
  }
  
  String getName(){
    return name; 
  }
  // public GFCard getCard(){
  
  // }
  
  //I want to add a fucntion that sorts the cards
  
  void printGFCard(){
    if(suit == 'c') System.out.print(name + "C");
    else if(suit == 'd') System.out.print(name + "D");
    else if(suit == 'h') System.out.print(name + "H");
    else System.out.print(name + "S");
  }
  
  //Comparison method that I don't fully understand
  public int compareCardTo(boolean order, GFCard c) { 
    return (this.getValue() < c.getValue() ? -1 : 
              (this.getValue() == c.getValue() ? 0 : 1));
    
    
  }
  
}