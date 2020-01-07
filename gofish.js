var s = document.getElementById('start');
var r = document.getElementById('rules');
r.style.display = 'none';

function startGame() {
  console.log('start Game');
}

function hideRules() {
  console.log('hide');

  r.style.display = 'block';
  if (r.style.display == 'block') {
    r.style.display = 'none';
  }else {
    r.style.display = 'block';
  }

  if (s.style.display == 'block') {
    s.style.display = 'none';
  }else {
    s.style.display = 'block';
  }

}

function rules() {

  if (r.style.display == 'block') {
    r.style.display = 'none';
  }else {
    r.style.display = 'block';
  }

  if (s.style.display == 'none') {
    s.style.display = 'block';
  }else {
    s.style.display = 'none';
  }
}
