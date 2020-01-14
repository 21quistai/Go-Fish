var start = document.getElementById('start');
var g = document.getElementById('game');
var r = document.getElementById('rules');

r.style.display = 'none';
g.style.display = 'none';

function startGoFish() {
  if (g.style.display == 'block') {
    g.style.display = 'none';
  } else {
    g.style.display = 'block';
  }

  if (start.style.display == 'none') {
    start.style.display = 'block';
  } else {
    start.style.display = 'none';
  }
}

function hideGame() {
  g.style.display = 'block';
  if (g.style.display == 'block') {    g.style.display = 'none';
  } else {
    g.style.display = 'block';
  }

  if (start.style.display == 'none') {
    start.style.display = 'block';
  } else {
    start.style.display = 'none';
  }
}

function hideRules() {
  r.style.display = 'block'; //hides the Rules
  if (r.style.display == 'block') { //then shows
    r.style.display = 'none';
  } else {
    r.style.display = 'block';
  }

  if (start.style.display == 'block') {
    start.style.display = 'none';
  } else {
    start.style.display = 'block';
  }
}

function rules() { //shows the rules
  if (r.style.display == 'block') {
    r.style.display = 'none';
  } else {
    r.style.display = 'block';
  }

  if (start.style.display == 'none') {
    start.style.display = 'block';
  } else {
    start.style.display = 'none';
  }

}
