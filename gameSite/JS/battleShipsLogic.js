var player1 = [];

var player2 = [];

var gameBoard1 = [ //player1's
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
];

var gameBoard2 = [ //player2's
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
];

var score = 0;
var canClick = true;
var activePlayer = 0;
var next = document.getElementById('next').addEventListener('click', function(){
    showSecond();
});
var div = document.getElementById('table');

function gamer(){
    drawTable(player1,false);
    alert('Player 1: this is your board');
}

function showSecond(){
    alert('Player 2: this is your board');
    drawTable(player2,false);
}

function generateBoard(){
    value = 0
    player1 = [...Array(10)].map(e => Array(10).fill(value));
    place(player1,5);
    place(player1,4);
    place(player1,3);
    place(player1,3);
    place(player1,2);
    // player2 = [...Array(10)].map(e => Array(10).fill(value));
    // place(player2,5);
    // place(player2,4);
    // place(player2,3);
    // place(player2,3);
    // place(player2,2);
}

function drawTable(player, select){
    let table = '';
    for(let x = 0; x < player.length; x++){
        table += '<tr>';
        for(let y = 0; y < player[0].length; y++){
            if (select == false){
                if (player[x][y] == 4){
                    table += "<th class='red' id='row" + x +"col" + y + "'></th>";
                }
                if (player[x][y] == 1){
                    table += "<th class='grey' id='row" + x +"col" + y + "'></th>";
                }
                else if (player[x][y] == 3) {
                    table += "<th class='yellow' id='row" + x +"col" + y + "'></th>";
                }
                else {
                    table += "<th class='blue' id='row" + x +"col" + y + "'></th>";
                }
            }
            else {
                if (player[x][y] == 3) {
                    table += "<th class='yellow' id='row" + x +"col" + y + "'></th>";
                }
                else {
                    table += "<th onClick=(compareBoards("+x+","+y+")) class='blue' id='row" + x +"col" + y + "'></th>";
                }
            }
        }
        table += '</tr>';
    }
    div.innerHTML = table;
}

function random(){
    return Math.floor(Math.random() *8);
}

function randomMoves(){
    return Math.floor(Math.random() *4) +1;
}

function place(player, value){
    let complete = false;
    while (complete != true){
        let x = random();
        let y = random();
        if (player[x][y] == 0){
            if(checkHorizontal(x,y,value,player)){
                edgeDetection(player);
                complete = true;
                return true;
            }
            else if (checkVertical(x,y,value,player)){
                edgeDetection(player);
                complete = true;
                return true;
            }   
        }
    }
}

function checkHorizontal(x,y,length,player){
    try{
        if (length == 5){
            if ((length - 5) > -1){
                if (player[x][(y-1)] == 0 && player[(x)][(y-2)] == 0 && player[x][(y-3)] == 0 && player[x][(y-4)] == 0){
                    console.log('here');
                    for(let b = 0; b < 5; b++){
                        player[(x)][(y-b)] = 1;
                    }
                    return 1;
                }
            }
            else if ((length + 5) < 8){
                if (player[x][(y+1)] == 0 && player[(x)][(y+2)] == 0 && player[x][(y+3)] == 0 && player[x][(y+4)] == 0){
                    console.log('here');
                    for(let b = 0; b < 5; b++){
                        player[(x)][(y+b)] = 1;
                    }
                    return 1;
                }
            }
        }
        if (length == 4){
            if ((length - 5) > -1){
                if (player[x][(y-1)] == 0 && player[(x)][(y-2)] == 0 && player[x][(y-3)] == 0){
                    console.log('here');
                    for(let b = 0; b < 4; b++){
                        player[(x)][(y-b)] = 1;
                    }
                    return 1;
                }
            }
            else if ((length + 5) < 8){
                if (player[x][(y+1)] == 0 && player[(x)][(y+2)] == 0 && player[x][(y+3)] == 0){
                    console.log('here');
                    for(let b = 0; b < 4; b++){
                        player[(x)][(y+b)] = 1;
                    }
                    return 1;
                }
            }
        }
        if (length == 3){
            if ((length - 5) > -1){
                if (player[x][(y-1)] == 0 && player[(x)][(y-2)] == 0){
                    console.log('here');
                    for(let b = 0; b < 3; b++){
                        player[(x)][(y-b)] = 1;
                    }
                    return 1;
                }
            }
            else if ((length + 5) < 8){
                if (player[x][(y+1)] == 0 && player[(x)][(y+2)] == 0){
                    console.log('here');
                    for(let b = 0; b < 3; b++){
                        player[(x)][(y+b)] = 1;
                    }
                    return 1;
                }
            }
        }
        if (length == 2){
            if ((length - 5) > -1){
                if (player[x][(y-1)] == 0){
                    console.log('here');
                    for(let b = 0; b < 2; b++){
                        player[(x)][(y-b)] = 1;
                    }
                    return 1;
                }
            }
            else if ((length + 5) < 8){
                if (player[x][(y+1)] == 0){
                    console.log('here');
                    for(let b = 0; b < 2; b++){
                        player[(x)][(y+b)] = 1;
                    }
                    return 1;
                }
            }
        }
    }
    catch {
        return false;
    }
}

function checkVertical(x,y,length,player){
    try{
        if (length == 5){
            if ((length - 5) > -1){
                if (player[(x-1)][y] == 0 && player[(x-2)][y] == 0 && player[(x-3)][y] == 0 && player[(x-4)][y] == 0){
                    for(let b = 0; b < 5; b++){
                        player[(x-b)][y] = 1;
                    }
                    return 1;
                }
            }
            else if ((length + 5) < 8){
                if (player[(x+1)][y] == 0 && player[(x+2)][y] == 0 && player[(x+3)][y] == 0 && player[(x+4)][y] == 0){
                    for(let b = 0; b < 5; b++){
                        player[(x+b)][y] = 1;
                    }
                    return 1;
                }
            }
        }
        if (length == 4){
            if ((length - 4) > -1){
                if (player[(x-1)][y] == 0 && player[(x-2)][y] == 0 && player[(x-3)][y] == 0){
                    for(let b = 0; b < 4; b++){
                        player[(x-b)][y] = 1;
                    }
                    return 1;
                }
            }
            else if ((length + 4) < 8){
                if (player[(x+1)][y] == 0 && player[(x+2)][y] == 0 && player[(x+3)][y] == 0){
                    for(let b = 0; b < 4; b++){
                        player[(x+b)][y] = 1;
                    }
                    return 1;
                }
            }
        }
        if (length == 3){
            if ((length - 3) > -1){
                if (player[(x-1)][y] == 0 && player[(x-2)][y] == 0){
                    for(let b = 0; b < 3; b++){
                        player[(x-b)][y] = 1;
                    }
                    return 1;
                }
            }
            else if ((length + 3) < 8){
                if (player[(x+1)][y] == 0 && player[(x+2)][y] == 0){
                    for(let b = 0; b < 3; b++){
                        player[(x+b)][y] = 1;
                    }
                    return 1;
                }
            }
        }
        if (length == 2){
            if ((length - 3) > -1){
                if (player[(x-1)][y] == 0){
                    for(let b = 0; b < 2; b++){
                        player[(x-b)][y] = 1;
                    }
                    return 1;
                }
            }
            else if ((length + 3) < 8){
                if (player[(x+1)][y] == 0){
                    for(let b = 0; b < 2; b++){
                        player[(x+b)][y] = 1;
                    }
                    return 1;
                }
            }
        }
    }
    catch {
        return false;
    }
}

function standardizeX(id){
    let x = id.substring(0,4)
    return parseInt(x.replace('row',''));
}

function standardizeY(id){
    let y = id.substring(4,8)
    return parseInt(y.replace('col',''));
}

function edgeDetection(player){
    for (let x = 0; x < player.length; x++){
        for (let y = 0; y < player[0].length; y++){
            if(player[x][y] == 1){//finds cells users have selected
                if ((y-1) != -1){//left
                    if(player[x][y-1] != 1){player[x][y-1] = 2;}
                }
                if ((x-1) !=-1 && (y+1) != 10){//top-right
                    if (player[x-1][y+1] != 1){player[x-1][y+1] = 2;}
                }
                if ((x-1) !=-1 && (y-1) !=-1){//top-left
                    if (player[x-1][y-1] != 1){player[x-1][y-1] = 2;}
                }
                if ((x-1) != -1){//top
                    if (player[x-1][y] != 1){player[x-1][y] = 2;}
                }
                if ((x+1) != -1){//underneath
                    if (player[x+1][y] != 1){player[x+1][y] = 2;}
                }
                if ((x+1) != 10 && (y-1) != -1){//bottom-left
                    if (player[x+1][y-1] != 1){player[x+1][y-1] = 2;}
                }
                if ((x+1) != 10 && (y+1) != -1){//bottom-right
                    if (player[x+1][y+1] != 1){player[x+1][y+1] = 2;}
                }
                if ((y+1) != -1){//rightside
                    if (player[x][y+1] != 1){player[x][y+1] = 2;}
                }
            }
        }
    }
    return 'completed';
}
