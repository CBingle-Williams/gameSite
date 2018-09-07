var CANVAS_HEIGHT = parseInt(window.getComputedStyle(document.getElementsByClassName('container')[0], null).getPropertyValue("height"));
var CANVAS_WIDTH = parseInt(window.getComputedStyle(document.getElementsByClassName('container')[0], null).getPropertyValue("width"));
var FREE_SPACE = 200;
var scoreCounter = document.getElementsByClassName('score')[0];
var container = document.getElementById('canvas');
var pipe = document.getElementById('first');
var bird = document.getElementById('bird');
var start = document.getElementById('canvas').addEventListener('click', function(){
    setTimeout(pipes('first'),3000);
    scoreCounter.style.display = 'block';
}, {once:true});
var square = document.getElementsByClassName('square')[0];
var modal = document.getElementsByClassName('modal')[0];
var reset = document.getElementById('restart').addEventListener('click', function (){location.reload()});
var reset = document.getElementById('leaderboard').addEventListener('click', function (){cache.update()});
var highScore = document.getElementById('highscore');
var counterDiv = document.getElementById('counter');
var bird = new component(removePX(window.getComputedStyle(square, null).getPropertyValue("left")), removePX(window.getComputedStyle(square, null).getPropertyValue("top")));
var cache = new cache();
var first = true;
var start = false;
var collision = false;
var counter = 0;
var level = 0;
var highscore = cache.check();
function pipes(id) {
    if(!start){
        setInterval(updateGameArea, 20);
    }
    start = true;
    var elem = document.getElementById(id);
    var topElem = elem.getElementsByClassName('box')[0];
    var bottomElem = elem.getElementsByClassName('box')[1];
    var space = [220,420]; //240 and 420 are set values for first two pipes
    var pos = 0;
    var id = setInterval(frame, 6);
    function frame() {
        if (collision){clearInterval(id)};
        if(first && pos == 290){
            pipes('second');
            first = false;
        }
        if (pos == (CANVAS_WIDTH+110)) {
            let top = Math.floor(Math.random() * (300-100)) + 100;
            let bottom = CANVAS_HEIGHT - FREE_SPACE - top;
            topElem.style.height = top + 'px';
            bottomElem.style.height = bottom + 'px';
            space[0] = top;
            space[1] = CANVAS_HEIGHT - bottom;
            pos = 0;
        } else {
                if(checkCollisions(pos, space[0], space[1])){collision = true}; //stops user being able to move bird
                pos++;
                elem.style.right = pos + 'px';
        }
    }
};

function rotate(){
    square.style.transform = 'rotate(-20deg)';
    square.style.transition = 'transform 0.2s';
    setTimeout(reverseRotation, 400);
}

function reverseRotation(){
    square.style.transform = 'rotate(+90deg)';
    square.style.transition = 'transform 1.2s';
}


function killBird() {
    square.innerHTML = '<img src="../IMG/bird1.png" height="50px" width="50px"></img>';
    scoreCounter.style.display = 'none';
    modal.style.display = 'block';
}

function checkCollisions(x_axis, top, bottom){
    let height = removePX(window.getComputedStyle(square, null).getPropertyValue("top"));
    if(x_axis > 400 && 510 > x_axis){ // checks relative x_axis compared to position of bird relative to the right side of canvas.
        if (!(height > top && bottom > (height+50))){ // checks if bird is in space between two pipes.
            bird.gravity = 0.7;
            killBird();
            return true;
        }
        else {
            if(x_axis == 450) {
                counter++; 
                counterDiv.innerHTML = counter;
                scoreCounter.innerHTML = counter;
            }
        }
    }
};

function removePX(string) {
    return parseInt(string.replace('px',''));
};

function component(x, y) {
    this.x = x;
    this.y = y;    
    this.speedY = 0;   
    this.height = 50; // accounts for the height of the bird;
    this.gravity = 0.4;
    this.gravitySpeed = 0;
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.y += this.speedY + this.gravitySpeed;
        this.checkIfBirdHitFloor();
    }
    this.update = function() {
        square.style.top = this.y +'px';
    }
    this.checkIfBirdHitFloor = function() {
        var rockbottom = CANVAS_HEIGHT - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }
};

function accelerate(n) {
    if (!collision) {
        bird.gravitySpeed = n;
        rotate();
    }
};
function updateGameArea() {
    bird.newPos();
    bird.update();
}
function cache() {
    this.highscore = null;
    this.check = function(){
        if(localStorage['highscore']){
            this.highscore = parseInt(localStorage['highscore']);
            highScore.textContent = this.highscore;
            return this.highscore;
        }
        else {return false;}
    }
    this.write = function() {
        localStorage['highscore'] = this.highscore;
        return localStorage['highscore'];
    }
    this.update = function() {
        if(counter>this.highscore){
            this.highscore = counter;
            highScore.textContent = this.highscore;
            this.write();
            return true;
        }
    }
    this.reset = function(){
        this.highscore = 0;
        highScore.textContent = this.highscore;
        this.write();
    }
};