var j; // used so that i doesn't = a char
var cardImg = [];
for (var i = 0; i < 13; i++) {
  j = i;
  if (j == 1) j = 'A';
  if (j == 11) j = 'J';
  if (j == 12) j = 'Q';
  if (j == 13) j = 'K';
  cardImg.push('playing cards png/' + j + 'C.png');
  cardImg.push('playing cards png/' + j + 'D.png');
  cardImg.push('playing cards png/' + j + 'H.png');
  cardImg.push('playing cards png/' + j + 'S.png');
      }
}
