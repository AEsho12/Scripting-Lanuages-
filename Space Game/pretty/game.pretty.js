/*--Initialize-------------------------------------------------------------------------------------------------------------------------------------*/
window.oncontextmenu = (e)=>{e.preventDefault()}
window.onresize = resize;
window.onload = initLoad;

let board = [], blockInput = false, selectedCoords = [null,null], player = {x:null,y:null}, enemies = [];
let numPlayer = 0, numEnemy = 0, numAsteroid = 0, numInactiveMines = 0, round = 1;
let mineInactiveImg = new Image(); mineInactiveImg.src = "images/mine-inactive.png";
let mineActiveImg = new Image(); mineActiveImg.src = "images/mine-active.png";
let asteroidImg = new Image(); asteroidImg.src = "images/asteroid.png";
let playerImg = new Image(); playerImg.src = "images/player.png";
let enemyImg = new Image(); enemyImg.src = "images/enemy.png";

function initLoad(){
    for(let i = 0; i < 10; i++){
        board.push([]);
        for(let j = 0; j < 10; j++){
            board[i].push(null);
        }
    }
    resize();
    addEvents();
}
function resize(){
    let mainCanvas = document.querySelector("#main-canvas");
    mainCanvas.height = window.innerHeight*0.7 - window.innerHeight*0.7 % 10;
    mainCanvas.width = mainCanvas.height;
    drawBoard();
}
function addEvents(){
    window.onkeydown = inputBoardSetup;
    document.querySelector("#end-game").onclick = endGame;
    document.querySelector("#start-game").onclick = startGame;
    document.querySelector("#main-canvas").onclick = setupClick;
    document.querySelector(".background").onclick = ()=>{
        if(!blockInput){
            selectedCoords = [null,null];
            drawBoard();
        }
    };
}
function random(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*--Windows----------------------------------------------------------------------------------------------------------------------------------------*/
function openWindow(element){
    element.style.animation = "fadeIn linear 0.2s";
    element.style.display = "flex";
    element.onanimationend = ()=>{
        element.style.animation = "none";
        element.onanimationend = "";
    }
}
function closeWindow(element){
    element.style.animation = "fadeOut linear 0.2s";
    element.onanimationend = ()=>{
        element.style.animation = "none";
        element.style.display = "none";
        element.onanimationend = "";
    }
}
function openAlert(text){
    let alertWindowMask = document.querySelector("#alert-window-mask");
    let alertWindow = document.querySelector("#alert-window");
    alertWindow.innerHTML = text;
    openWindow(alertWindowMask);
    blockInput = true;
    setTimeout(()=>{
        closeWindow(alertWindowMask);
        blockInput = false;
    },1500);
}

/*--Game Board-------------------------------------------------------------------------------------------------------------------------------------*/
function drawBoard(){
    let mainCanvas = document.querySelector("#main-canvas");
    let ctx = mainCanvas.getContext("2d");
    let blockSize = mainCanvas.height/10;

    ctx.clearRect(0,0,mainCanvas.width,mainCanvas.height);
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            ctx.beginPath();
            ctx.strokeStyle = "rgb(50,50,50)";
            ctx.rect(i*blockSize-0.5,j*blockSize-0.5,blockSize,blockSize);
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            ctx.imageSmoothingEnabled = false;
            if(board[i][j]){
                switch(board[i][j]){
                    case "mi": ctx.drawImage(mineInactiveImg,i*blockSize-0.5,j*blockSize-0.5,blockSize,blockSize); break;
                    case "ma": ctx.drawImage(mineActiveImg,i*blockSize-0.5,j*blockSize-0.5,blockSize,blockSize); break;
                    case "a":  ctx.drawImage(asteroidImg,i*blockSize-0.5,j*blockSize-0.5,blockSize,blockSize); break;
                    case "e":  ctx.drawImage(enemyImg,i*blockSize-0.5,j*blockSize-0.5,blockSize,blockSize); break;
                }
            }
            ctx.closePath();
        }
    }
    if(player.x != null && player.y != null){
        ctx.beginPath();
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(playerImg,player.x*blockSize-0.5,player.y*blockSize-0.5,blockSize,blockSize);
        ctx.closePath();
    }
    if(selectedCoords[0] != null && selectedCoords[1] != null){
        ctx.beginPath();
        ctx.strokeStyle = "rgb(0,255,255)";
        ctx.rect(selectedCoords[0]*blockSize-0.5,selectedCoords[1]*blockSize-0.5,blockSize,blockSize);
        ctx.stroke();
        ctx.closePath();
    }
}
function setupClick(e){
    if(!blockInput){
        let blockSize = (window.innerHeight*0.7 - window.innerHeight*0.7 % 10) / 10;
        let x = Math.floor(e.offsetX/blockSize);
        let y = Math.floor(e.offsetY/blockSize);
        selectedCoords = [x,y];
        drawBoard();
    }
}
function inputBoardSetup(e){
    if(!blockInput){
        if(selectedCoords[0] != null && selectedCoords[1] != null){
            switch(e.key){
                default:openAlert("Invalid key pressed<br>Valid keys are : A , M , R , U");break;
                case "Delete":deleteBlock();break;
                case "a":placeAsteroid();break;
                case "A":placeAsteroid();break;
                case "u":placePlayer();break;
                case "U":placePlayer();break;
                case "r":placeEnemy();break;
                case "R":placeEnemy();break;
                case "m":placeMine();break;
                case "M":placeMine();break;
            }
        } 
    }    
}
function placePlayer(){
    if(numPlayer > 0) openAlert("There can only be one player");
    else{
        if(board[selectedCoords[0]][selectedCoords[1]] === "mi") numInactiveMines--;
        else if(board[selectedCoords[0]][selectedCoords[1]] === "a") numAsteroid--;
        else if(board[selectedCoords[0]][selectedCoords[1]] === "e"){
            numEnemy--;
            for(let i = 0; i < enemies.length; i++){
                if(enemies[i].x === selectedCoords[0] && enemies[i].y === selectedCoords[1]){
                    enemies.splice(i,1);
                }
            }
        }
        board[selectedCoords[0]][selectedCoords[1]] = "p";
        player.x = selectedCoords[0];
        player.y = selectedCoords[1];
        numPlayer++;
        drawBoard();
    }
}
function placeEnemy(){
    if(board[selectedCoords[0]][selectedCoords[1]] === "mi") numInactiveMines--;
    else if(board[selectedCoords[0]][selectedCoords[1]] === "a") numAsteroid--;
    else if(board[selectedCoords[0]][selectedCoords[1]] === "p"){
        player = {x:null,y:null};
        numPlayer--;
    }
    board[selectedCoords[0]][selectedCoords[1]] = "e";
    enemies.push({x:selectedCoords[0],y:selectedCoords[1]});
    numEnemy++;
    drawBoard();
}
function placeAsteroid(){
    if(board[selectedCoords[0]][selectedCoords[1]] === "mi") numInactiveMines--;
    else if(board[selectedCoords[0]][selectedCoords[1]] === "p"){
        player = {x:null,y:null};
        numPlayer--;
    }
    else if(board[selectedCoords[0]][selectedCoords[1]] === "e"){
        numEnemy--;
        for(let i = 0; i < enemies.length; i++){
            if(enemies[i].x === selectedCoords[0] && enemies[i].y === selectedCoords[1]){
                enemies.splice(i,1);
            }
        }
    }
    board[selectedCoords[0]][selectedCoords[1]] = "a";
    numAsteroid++;
    drawBoard();
}
function placeMine(){
    if(board[selectedCoords[0]][selectedCoords[1]] === "a") numAsteroid--;
    else if(board[selectedCoords[0]][selectedCoords[1]] === "p"){
        player = {x:null,y:null};
        numPlayer--;
    }
    else if(board[selectedCoords[0]][selectedCoords[1]] === "e"){
        numEnemy--;
        for(let i = 0; i < enemies.length; i++){
            if(enemies[i].x === selectedCoords[0] && enemies[i].y === selectedCoords[1]){
                enemies.splice(i,1);
            }
        }
    }
    board[selectedCoords[0]][selectedCoords[1]] = "mi";
    numInactiveMines++;
    drawBoard();
}
function deleteBlock(){
    if(board[selectedCoords[0]][selectedCoords[1]] === "a") numAsteroid--;
    else if(board[selectedCoords[0]][selectedCoords[1]] === "p"){
        player = {x:null,y:null};
        numPlayer--;
    }
    else if(board[selectedCoords[0]][selectedCoords[1]] === "mi") numInactiveMines--;
    else if(board[selectedCoords[0]][selectedCoords[1]] === "e"){
        numEnemy--;
        for(let i = 0; i < enemies.length; i++){
            if(enemies[i].x === selectedCoords[0] && enemies[i].y === selectedCoords[1]){
                enemies.splice(i,1);
            }
        }
    }
    board[selectedCoords[0]][selectedCoords[1]] = null;
    drawBoard();
}

/*--Game-------------------------------------------------------------------------------------------------------------------------------------------*/
function startGame(){
    if(numPlayer === 0) openAlert("You must have a player");
    else{
        document.querySelector("#mines").innerHTML = numInactiveMines;
        document.querySelector("#enemies").innerHTML = numEnemy;
        document.querySelector("#round").innerHTML = round;

        closeWindow(document.querySelector("#setup-explain"));
        closeWindow(document.querySelector("#start-game"));
        setTimeout(()=>{
            openWindow(document.querySelector("#end-game"));
            openWindow(document.querySelector("#stats"));
        },250);

        selectedCoords = [null,null];
        drawBoard();
    
        window.onkeydown = inputBoardGame;
        document.querySelector("#main-canvas").onclick = ()=>{}
        document.querySelector("#main-canvas").style.cursor = "default";
    }
}
function endGame(){
    let endWindowMask = document.querySelector("#end-window-mask");
    let endWindow = document.querySelector("#end-window");
    let end;
    if(numEnemy === 0) end = 1;
    else if(numPlayer === 0) end = 2;
    else end = 0;
    switch(end){
        default:break;
        case 0:endWindow.innerHTML = "Game Over<br>Draw";break;
        case 1:endWindow.innerHTML = "Game Over<br>Player Won";break;
        case 2:endWindow.innerHTML = "Game Over<br>Computer Won";break;
    }
    blockInput = true;
    openWindow(endWindowMask);
}
function inputBoardGame(e){
    if(!blockInput){
        switch(e.key){
            default:openAlert("Invalid key pressed<br>Valid keys are : W , A , S , D");break;
            case "d":moveRight();break;
            case "D":moveRight();break;
            case "a":moveLeft();break;
            case "A":moveLeft();break;
            case "s":moveDown();break;
            case "S":moveDown();break;
            case "w":moveUp();break;
            case "W":moveUp();break;
        }
    }
}
function moveUp(){
    let newY = player.y-1;
    if(newY < 0) openAlert("You can't go outside of the game board!");
    else if(board[player.x][newY] === "a") openAlert("You can't go on an asteroid");
    else if(board[player.x][newY] === "mi"){
        numInactiveMines--;
        document.querySelector("#mines").innerHTML = numInactiveMines;
        board[player.x][newY] = "ma";
        player.y = newY;
        updateMine(player.x,player.y);
    }
    else if(board[player.x][newY] === "e"){
        player = {x:null,y:null};
        numPlayer--;
        endGame();
        drawBoard();
        return;
    }
    else player.y = newY;
    moveEnemies();
    drawBoard();
}
function moveDown(){
    let newY = player.y+1;
    if(newY > 9) openAlert("You can't go outside of the game board!");
    else if(board[player.x][newY] === "a") openAlert("You can't go on an asteroid");
    else if(board[player.x][newY] === "mi"){
        numInactiveMines--;
        document.querySelector("#mines").innerHTML = numInactiveMines;
        board[player.x][newY] = "ma";
        player.y = newY;
        updateMine(player.x,player.y);
    }
    else if(board[player.x][newY] === "e"){
        player = {x:null,y:null};
        numPlayer--;
        endGame();
        drawBoard();
        return;
    }
    else player.y = newY;
    moveEnemies();
    drawBoard();
}
function moveLeft(){
    let newX = player.x-1;
    if(newX < 0) openAlert("You can't go outside of the game board!");
    else if(board[newX][player.y] === "a") openAlert("You can't go on an asteroid");
    else if(board[newX][player.y] === "mi"){
        numInactiveMines--;
        document.querySelector("#mines").innerHTML = numInactiveMines;
        board[newX][player.y] = "ma";
        player.x = newX;
        updateMine(player.x,player.y);
    }
    else if(board[newX][player.y] === "e"){
        player = {x:null,y:null};
        numPlayer--;
        endGame();
        drawBoard();
        return;
    }
    else player.x = newX;
    moveEnemies();
    drawBoard();
}
function moveRight(){
    let newX = player.x+1;
    if(newX > 9) openAlert("You can't go outside of the game board!");
    else if(board[newX][player.y] === "a") openAlert("You can't go on an asteroid");
    else if(board[newX][player.y] === "mi"){
        numInactiveMines--;
        document.querySelector("#mines").innerHTML = numInactiveMines;
        board[newX][player.y] = "ma";
        player.x = newX;
        updateMine(player.x,player.y);
    }
    else if(board[newX][player.y] === "e"){
        player = {x:null,y:null};
        numPlayer--;
        endGame();
        drawBoard();
        return;
    }
    else player.x = newX;
    moveEnemies();
    drawBoard();
}
function updateMine(x,y){
    for(let i = x-1; i <= x+1; i++){
        for(let j = y-1; j <= y+1; j++){
            if(i >= 0 && i <= 9 && j >= 0 && j <= 9){
                for(let k = 0; k < enemies.length; k++){
                    if(enemies[k].x === i && enemies[k].y === j){
                        enemies.splice(k,1);
                        board[i][j] = null;
                        numEnemy--;
                        document.querySelector("#enemies").innerHTML = numEnemy;
                    }
                }
            }
        }
    }
    drawBoard();
}
function moveEnemies(){
    blockInput = true;
    for(let k = 0; k < enemies.length; k++){
        let currEnemy = enemies[k];
        /*check for player*/
        let playerFound = false;
        for(let i = currEnemy.x-1; i <= currEnemy.x+1; i++){
            for(let j = currEnemy.y-1; j <= currEnemy.y+1; j++){
                if(i >= 0 && i <= 9 && j >= 0 && j <= 9){
                    if(player.x === i && player.y === j){
                        playerFound = true;
                        board[currEnemy.x][currEnemy.y] = null;
                        board[i][j] = "e";
                        currEnemy.x = i;
                        currEnemy.y = j;
                        for(let m = player.x-1; m <= player.x+1; m++){
                            for(let n = player.y-1; n <= player.y+1; n++){
                                if(m >= 0 && m <= 9 && n >= 0 && n <= 9){
                                    if(board[m][n] === "ma"){
                                        board[i][j] = null;
                                        enemies.splice(k,1);
                                        numEnemy--;
                                        document.querySelector("#enemies").innerHTML = numEnemy;
                                        break;
                                    }
                                }
                            }
                        }
                        player = {x:null,y:null};
                        numPlayer--;
                        drawBoard();
                        endGame();
                        break;
                    }
                }
            }
        }
        if(!playerFound){
            /*check for mines*/
            let mineFound = false;
            for(let i = currEnemy.x-1; i <= currEnemy.x+1; i++){
                for(let j = currEnemy.y-1; j <= currEnemy.y+1; j++){
                    if(i >= 0 && i <= 9 && j >= 0 && j <= 9){
                        if(board[i][j] === "mi"){
                            mineFound = true;
                            numInactiveMines--;
                            document.querySelector("#mines").innerHTML = numInactiveMines;
                            board[currEnemy.x][currEnemy.y] = null;
                            board[i][j] = "e";
                            currEnemy.x = i;
                            currEnemy.y = j;
                            for(let m = currEnemy.x-1; m <= currEnemy.x+1; m++){
                                for(let n = currEnemy.y-1; n <= currEnemy.y+1; n++){
                                    if(m >= 0 && m <= 9 && n >= 0 && n <= 9){
                                        if(board[m][n] === "ma"){
                                            board[currEnemy.x][currEnemy.y] = null;
                                            enemies.splice(k,1);
                                            numEnemy--;
                                            document.querySelector("#enemies").innerHTML = numEnemy;
                                            break;
                                        }
                                    }
                                }
                            }
                            drawBoard();
                        }
                    }
                }
            }
            if(!mineFound){
                /*arbitrary move*/
                let validSpots = [];
                for(let i = currEnemy.x-1; i <= currEnemy.x+1; i++){
                    for(let j = currEnemy.y-1; j <= currEnemy.y+1; j++){
                        if(i >= 0 && i <= 9 && j >= 0 && j <= 9){
                            if(i != currEnemy.x || j != currEnemy.y){
                                if(board[i][j] != "a" && board[i][j] != "e") validSpots.push({x:i,y:j});
                            }
                        }
                    }
                }
                if(validSpots.length > 0){
                    let moveIndex = random(0,validSpots.length-1);
                    let currMove = validSpots[moveIndex];
                    board[currEnemy.x][currEnemy.y] = null;
                    board[currMove.x][currMove.y] = "e";
                    currEnemy.x = currMove.x;
                    currEnemy.y = currMove.y;
                    for(let m = currEnemy.x-1; m <= currEnemy.x+1; m++){
                        for(let n = currEnemy.y-1; n <= currEnemy.y+1; n++){
                            if(m >= 0 && m <= 9 && n >= 0 && n <= 9){
                                if(board[m][n] === "ma"){
                                    board[currEnemy.x][currEnemy.y] = null;
                                    enemies.splice(k,1);
                                    numEnemy--;
                                    document.querySelector("#enemies").innerHTML = numEnemy;
                                    break;
                                }
                            }
                        }
                    }
                    drawBoard();
                }
            }
        }
    }
    blockInput = false;
    round++;
    document.querySelector("#round").innerHTML = round;
    if(numEnemy === 0 || numPlayer === 0 || numInactiveMines === 0) endGame();
}