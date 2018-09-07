var selectedCards = 0;
var start = true;
var cardsLeft = 8;
var first = 0;
var firstCard = undefined;
var second = undefined;
var container = document.getElementById('canvas');
var cards = document.getElementsByClassName('gameCards');
var size = 86;
var columns = Array.from(document.getElementsByClassName('column'));
var modal = document.getElementById('popup');
var popup = document.getElementById('popup');
var d = void 0,c = void 0;
var classList = ['visible', 'close', 'far', 'far', 'distant', 'distant'];

var c = 0;
var seconds = 0;
var minutes = 0;
var hours = 0;
for (let card of cards){
  card.addEventListener('click', function() {
    if (start){
      timer();
      start = false;
    }
    compareCards(card);
  })
};

function compareCards(card){
  if (selectedCards == 0){
    first = card.getElementsByClassName('theback')[0].innerHTML;
    card.classList.toggle('selected');
    firstCard = card;
    selectedCards = 1;
  }
  else if (selectedCards == 1){
    selectedCards = 2;
    second = card.getElementsByClassName('theback')[0].innerHTML;
    card.classList.toggle('selected');
    if (first == second && firstCard.id != card.id){
      cardsLeft--;
      setTimeout(function() {
        firstCard.classList.toggle('chosen');
        card.classList.toggle('chosen');
        firstCard.classList.toggle('selected');
        card.classList.toggle('selected');
        selectedCards = 0;
      },1500);
    }
    else {
      setTimeout(function() {
        firstCard.classList.toggle('incorrect');
        card.classList.toggle('incorrect');
        firstCard.classList.toggle('selected');
        card.classList.toggle('selected');
        setTimeout(function(){
          firstCard.classList.toggle('incorrect');
          card.classList.toggle('incorrect');
          selectedCards = 0;
        },1000);
      },1500);
    }
  }
  else {
  }
  if (cardsLeft == 0) {
    setTimeout(modalShow,1800);
  }
}

function add() {
  seconds++;
  if (seconds >= 60) {
      seconds = 0;
      minutes++;
      if (minutes >= 60) {
          minutes = 0;
          hours++;
      }
  }
  
  c = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + (seconds > 9 ? seconds : "0" + seconds);
  columns.forEach(function (ele, i) {
      var n = +c[i];
      var offset = -n * size;
      ele.style.transform = 'translateY(calc(9vh + ' + offset + 'px - ' + size / 2 + 'px))';
      Array.from(ele.children).forEach(function (ele2, i2) {
        ele2.className = 'num ' + getClass(n, i2);
      });
    });
  if (cardsLeft != 0){
    timer();
  }
}
function timer() {
  setTimeout(add, 1000);
}
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function getClass(n, i2) {
return classList.find(function (class_, classIndex) {return Math.abs(n - i2) === classIndex;}) || '';
}

window.onload = function() {
  for (var i = cards.length; i >= 0; i--) {
      container.appendChild(cards[Math.random() * i | 0]);
  }
};

function modalShow(){
  document.getElementById('canvas').style.display = 'none';
  modal.style.display = 'block';
  document.getElementsByClassName('score')[0].innerHTML = 'Your time was ' +minutes + ' m ' + seconds + ' s';
}