// The code for creating a board has been modified from (https://www.youtube.com/watch?v=Azx_uooP8rM) 
// The code for keyevents has been modified from (https://www.youtube.com/watch?v=YUdc2szWz8Q)

//Created to develope board
let tiles = []
let selectTile = -1

// Used to set player turns name
let turn = "your" 


let isStageCompleted = false
// All Stages --- Setup-01, Setup-02, Setup-03, Play, End
let currentStage = 'Setup-01' 


//Functions ----
const startGame = () => {
    //Creating all tiles ----
    for (var i = 0; i < 25; i++) {
        tiles.push({ id: i, color: '', text: '' })
    }
    Array.from(document.querySelectorAll(".tile")).forEach(tile => tile.addEventListener('click', tileClicked))
    document.addEventListener("keydown", keydown)

    setInterval(() => {
        if (currentStage == "Play") {
            // End Condition ----
            if (tiles.findIndex(tile => tile.color == "Red") == -1 || tiles.findIndex(tile => tile.color == "Black") == -1) {
                currentStage = "End"
            }
        }
        else if (currentStage == "End") {
            if (tiles.findIndex(tile => tile.color == "Black") == -1 && tiles.findIndex(tile => tile.color == "Red") != -1) {
                alert("Win Game")
            }
            //Game Alerts 
            else {
                alert("Lose Game")
            }
            window.location.reload();
        }
    }, 1000)
}

const moveTiles = (currentIndex, nextIndex) => {
    if (tiles[nextIndex].text == "" || tiles[currentIndex].text >= tiles[currentIndex].text) {
        tiles[nextIndex].color = tiles[currentIndex].color;
        tiles[nextIndex].text = tiles[currentIndex].text;
        tiles[currentIndex].color = '';
        tiles[currentIndex].text = '';
    }
    else {
        tiles[currentIndex].color = '';
        tiles[currentIndex].text = '';
    }
}
//Function used to create computers turn 
const computerTurn = () => {
    selectTile = -1
    var move = ""
    var blackTiles = tiles.filter(tile => tile.color == "Black");
    console.log(blackTiles)
    console.log(tiles)
    for (var i = 0; i < blackTiles.length; i++) {
        var blackTile = blackTiles[i]
        selectTile = blackTile.id
        var currentIndex = tiles.findIndex(tile => tile.id == selectTile)
        // UP
        let nextIndex = tiles.findIndex(tile => tile.id == (selectTile - 5))
        if (selectTile > 4 && nextIndex >= 0 && tiles[nextIndex].color == "Red" && tiles[currentIndex].text >= tiles[nextIndex].text) {
            move = "Up"
        }
        // Right
        nextIndex = tiles.findIndex(tile => tile.id == (selectTile - 1 + 2))
        if (selectTile != 4 && selectTile != 9 && selectTile != 14 && selectTile != 19 && selectTile != 24 && nextIndex >= 0 && tiles[nextIndex].color == "Red" && tiles[currentIndex].text >= tiles[nextIndex].text) {
            move = "Right"
        }
        //Left
        nextIndex = tiles.findIndex(tile => tile.id == (selectTile - 1))
        if (selectTile != 0 && selectTile != 5 && selectTile != 10 && selectTile != 15 && selectTile != 20 && nextIndex >= 0 && tiles[nextIndex].color == "Red" && tiles[currentIndex].text >= tiles[nextIndex].text) {
            move = "Left"
        }
        //Down
        nextIndex = tiles.findIndex(tile => tile.id == (selectTile - 1 + 6))
        if (selectTile < 20 && nextIndex >= 0 && tiles[nextIndex].color == "Red" && tiles[currentIndex].text >= tiles[nextIndex].text) {
            move = "Down"
        }
        if (move != "") {
            break
        }
    }
    console.log(move)
    if (move == "") {
        for (var i = 0; i < blackTiles.length; i++) {
            var blackTile = blackTiles[i]
            selectTile = blackTile.id
            var currentIndex = tiles.findIndex(tile => tile.id == selectTile)
            // UP
            let nextIndex = tiles.findIndex(tile => tile.id == (selectTile - 5))
            if (selectTile > 4 && nextIndex >= 0 && tiles[nextIndex].color == '' && tiles[currentIndex].text == '') {
                move = "Up"
            }
            // Right
            nextIndex = tiles.findIndex(tile => tile.id == (selectTile - 1 + 2))
            if (selectTile != 4 && selectTile != 9 && selectTile != 14 && selectTile != 19 && selectTile != 24 && nextIndex >= 0 && tiles[nextIndex].color == '' && tiles[currentIndex].text == '') {
                move = "Right"
            }
            //Left
            nextIndex = tiles.findIndex(tile => tile.id == (selectTile - 1))
            if (selectTile != 0 && selectTile != 5 && selectTile != 10 && selectTile != 15 && selectTile != 20 && nextIndex >= 0 && tiles[nextIndex].color == '' && tiles[currentIndex].text == '') {
                move = "Left"
            }
            //Down
            nextIndex = tiles.findIndex(tile => tile.id == (selectTile - 1 + 6))
            if (selectTile < 20 && nextIndex >= 0 && tiles[nextIndex].color == '' && tiles[currentIndex].text == '') {
                move = "Down"
            }
            if (move != "") {
                break
            }
        }
    }
    if (move == "") {
        for (var i = 0; i < blackTiles.length; i++) {
            var blackTile = blackTiles[i]
            selectTile = blackTile.id
            var currentIndex = tiles.findIndex(tile => tile.id == selectTile)
            // UP
            let nextIndex = tiles.findIndex(tile => tile.id == (selectTile - 5))
            if (selectTile > 4 && nextIndex >= 0 && tiles[nextIndex].color == "Red" && tiles[currentIndex].text < tiles[nextIndex].text) {
                move = "Up"
            }
            // Right
            nextIndex = tiles.findIndex(tile => tile.id == (selectTile - 1 + 2))
            if (selectTile != 4 && selectTile != 9 && selectTile != 14 && selectTile != 19 && selectTile != 24 && nextIndex >= 0 && tiles[nextIndex].color == "Red" && tiles[currentIndex].text < tiles[nextIndex].text) {
                move = "Right"
            }
            //Left
            nextIndex = tiles.findIndex(tile => tile.id == (selectTile - 1))
            if (selectTile != 0 && selectTile != 5 && selectTile != 10 && selectTile != 15 && selectTile != 20 && nextIndex >= 0 && tiles[nextIndex].color == "Red" && tiles[currentIndex].text < tiles[nextIndex].text) {
                move = "Left"
            }
            //Down
            nextIndex = tiles.findIndex(tile => tile.id == (selectTile - 1 + 6))
            if (selectTile < 20 && nextIndex >= 0 && tiles[nextIndex].color == "Red" && tiles[currentIndex].text < tiles[nextIndex].text) {
                move = "Down"
            }
        }
    }

    if (move != "") {
        console.log(selectTile);
        if (move == "Up") {
            moveTiles(currentIndex, tiles.findIndex(tile => tile.id == (selectTile - 5)));
        }
        else if (move == "Right") {
            moveTiles(currentIndex, tiles.findIndex(tile => tile.id == (selectTile - 1 + 2)));
        }
        else if (move == "Left") {
            moveTiles(currentIndex, tiles.findIndex(tile => tile.id == (selectTile - 1)));
        }
        else if (move == "Down") {
            moveTiles(currentIndex, tiles.findIndex(tile => tile.id == (selectTile - 1 + 6)));

        }
    }
    turn = "your"

    render()
}
//function for creating colored Tiles 
const render = () => {
    tiles.map(tile => {
        let html = '';
        if (tile.color == "Red") {
            html += `<div class="red">${tile.text}</div>`
        }
        else if (tile.color == "Black") {
            html += `<div class="black">${tile.text}</div>`
        }
        else {
            html += `<div>${tile.text}</div>`
        }
        document.getElementById(tile.id).innerHTML = html
    })
    document.querySelector(".playerYour").innerText = turn
}

//Events -----
//Stages 
function next(e) {
    if (isStageCompleted) {
        isStageCompleted = false

        if (currentStage == "Setup-01") {
            currentStage = "Setup-02"
        }
        else if (currentStage == "Setup-02") {
            currentStage = "Setup-03"
        }
        else if (currentStage == "Setup-03") {
            currentStage = "Play"
            isStageCompleted = true
        }
        else if (currentStage == "Play") {
            currentStage = "End"
        }
    }
}

function tileClicked(e) {
    if (turn == "your" && currentStage == "Play" && tiles[tiles.findIndex(tile => tile.id == e.target.id)].color == "Red") {
        selectTile = e.target.id
    }
    if (currentStage != "Play") {
        selectTile = e.target.id
    }
}

function keydown(e) {
    console.log(selectTile)
    console.log(tiles)
    if (selectTile >= 0) {
        let currentIndex = tiles.findIndex(tile => tile.id == selectTile)
        if (currentStage == "Setup-01") {
            if (!isStageCompleted) {
                if (e.keyCode == 66) {
                    tiles[currentIndex].color = ''
                    tiles[currentIndex].text = 'B'
                    isStageCompleted = true
                }
                else {
                    alert("Error! Enter Wrong Key! Press Only (B)")
                }
            }
            else {
                alert("Already fill one B")
            }
        }
        else if (currentStage == "Setup-02") {
            let count = 0
            tiles.map(tile => {
                if (tile.color == "Red") {
                    count = count + 1
                }
            })
            if (tiles[currentIndex].color == '' && tiles[currentIndex].text == '' && count < 8) {
                if (e.keyCode == 49) {
                    tiles[currentIndex].color = 'Red'
                    tiles[currentIndex].text = 1
                    isStageCompleted = true
                }
                else if (e.keyCode == 50) {
                    tiles[currentIndex].color = 'Red'
                    tiles[currentIndex].text = 2
                    isStageCompleted = true
                }
                else if (e.keyCode == 51) {
                    tiles[currentIndex].color = 'Red'
                    tiles[currentIndex].text = 3
                    isStageCompleted = true
                }
                else if (e.keyCode == 52) {
                    tiles[currentIndex].color = 'Red'
                    tiles[currentIndex].text = 4
                    isStageCompleted = true
                }
                else {
                    alert("Wrong Press Key! Press Only (1-4)")
                }
            }
            else {
                alert("Error! You cross limit or You try to fill again")
            }
        }
        else if (currentStage == "Setup-03") {
            let count = 0
            tiles.map(tile => {
                if (tile.color == "Black") {
                    count++
                }
            })
            if (tiles[currentIndex].color == '' && tiles[currentIndex].text == '' && count < 8) {
                if (e.keyCode == 49) {
                    tiles[currentIndex].color = 'Black'
                    tiles[currentIndex].text = 1
                    isStageCompleted = true
                }
                else if (e.keyCode == 50) {
                    tiles[currentIndex].color = 'Black'
                    tiles[currentIndex].text = 2
                    isStageCompleted = true
                }
                else if (e.keyCode == 51) {
                    tiles[currentIndex].color = 'Black'
                    tiles[currentIndex].text = 3
                    isStageCompleted = true
                }
                else if (e.keyCode == 52) {
                    tiles[currentIndex].color = 'Black'
                    tiles[currentIndex].text = 4
                    isStageCompleted = true
                }
                else {
                    alert("Wrong Press Key! Press Only (1-4)")
                }
            }
            else {
                alert("Error! You cross limit or You try to fill again")
            }
        }
        else if (currentStage == "Play") {
            if (turn == "your") { // Your Turn ----
                if (e.keyCode == 87 || e.keyCode == 68 || e.keyCode == 65 || e.keyCode == 83) {
                    if (e.keyCode == 87) { // UP
                        let nextIndex = tiles.findIndex(tile => tile.id == (selectTile - 5))
                        if (selectTile > 4 && nextIndex >= 0 && tiles[nextIndex].color != "Red" && tiles[nextIndex].text != "B") {
                            moveTiles(currentIndex, nextIndex)
                            turn = "computer"
                        }
                        else {
                            alert("Error! you can not move it up")
                        }
                    }
                    else if (e.keyCode == 68) { // RIGHT
                        let nextIndex = tiles.findIndex(tile => tile.id == (selectTile - 1 + 2))
                        console.log(selectTile + 1)
                        if (selectTile != 4 && selectTile != 9 && selectTile != 14 && selectTile != 19 && selectTile != 24 && nextIndex >= 0 && tiles[nextIndex].color != "Red" && tiles[nextIndex].text != "B") {
                            moveTiles(currentIndex, nextIndex)
                            turn = "computer"
                        }
                        else {
                            alert("Error! you can not move it right")
                        }
                    }
                    else if (e.keyCode == 65) { // LEFT
                        let nextIndex = tiles.findIndex(tile => tile.id == (selectTile - 1))
                        if (selectTile != 0 && selectTile != 5 && selectTile != 10 && selectTile != 15 && selectTile != 20 && nextIndex >= 0 && tiles[nextIndex].color != "Red" && tiles[nextIndex].text != "B") {
                            moveTiles(currentIndex, nextIndex)
                            turn = "computer"
                        }
                        else {
                            alert("Error! you can not move it left")
                        }
                    }
                    else if (e.keyCode == 83) { // DOWN
                        let nextIndex = tiles.findIndex(tile => tile.id == (selectTile - 1 + 6))
                        if (selectTile < 20 && nextIndex >= 0 && tiles[nextIndex].color != "Red" && tiles[nextIndex].text != "B") {
                            moveTiles(currentIndex, nextIndex)
                            turn = "computer"
                        }
                        else {
                            alert("Error! you can not move it down")
                        }
                    }
                }
                else {
                    alert("Wrong Press Key! Press Only (W-A-S-D)")
                }
            }
            if (turn == "computer") { // Computer Turn -----
                setTimeout(() => {
                    computerTurn();
                }, 2000)
            }
        }
    }
    else {
        alert("Error! Select any tile first")
    }
    selectTile = -1
    render();
}


startGame()