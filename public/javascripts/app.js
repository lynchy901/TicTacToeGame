/**
 * Created by nathan on 3/21/16.
 */
var debug = false;
var winningMove;

function print(data, override) {
    if (debug || override) {
        console.log(data);
    }
}

var gameboard = function() {
    var grid = ['-', '-', '-',
                '-', '-', '-',
                '-', '-', '-'];

    var gridWithTurns = ['-', '-', '-',
                        '-', '-', '-',
                        '-', '-', '-'];
    var turn = 'x';
    var turnNum = 0;

    function isEqualTo(val1, val2) {
        if (val1 !== '-' && val2 !== '-') {
            if (val1 === val2) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    var self = {
        getGameString: function() {
            return grid.join("");
        },
        getGameArrayWithTurns: function() {
            return gridWithTurns;
        },
        setSpace: function(index) {
            if (!(index >= 0 && index <= 8)) {
                alert("ERROR: Index out of bounds");
            } else {
                grid[index] = self.getTurn();
                gridWithTurns[index] = self.getTurn() + turnNum;
                document.getElementById(index + "").innerText = self.getTurn();
                turnNum += 1;
            }

        },
        checkWin: function() {
            var flag = false;

            //check horizontally
            for (var row = 0; row < 7; row+= 3) {
                print("comparing " + (row) + " : " + (row+1) + " and " + row + " : " + (row+2));
                if (isEqualTo(grid[row], grid[row + 1]) && isEqualTo(grid[row], grid[row+2])) {
                    flag = true;
                }
            }

            //check vertically
            for (var col = 0; col < 3; col++) {
                print("comparing " + (col) + " : " + (col+3) + " and " + col + " : " + (col+6));
                if (isEqualTo(grid[col], grid[col + 3]) && isEqualTo(grid[col], grid[col+6])) {
                    flag = true;
                }
            }

            //check diagonally
            print("comparing 0 : 4 and 0 : 8");
            print("comparing 2 : 4 and 2 : 6");
            if ((isEqualTo(grid[0], grid[4]) && isEqualTo(grid[0], grid[8])) || (isEqualTo(grid[2], grid[4]) && isEqualTo(grid[2], grid[6]))) {
                flag = true;
            }

            //check tie
            if (!flag && !(grid.indexOf('-') > -1)) {
                flag = "tie";
            }

            return flag;
        },
        toggleTurn: function () {
            if (turn === 'x') {
                turn = 'o';
            } else {
                turn = 'x';
            }
        },
        setTurn: function (newTurn) {
            if (newTurn != 'x' && turn != 'o') { // NaN is the only value not equal to itself
                alert("ERROR: must be x or o");
            } else {
                turn = newTurn;
            }
        },
        getTurn: function () {
            return turn;
        },
        getTurnNum: function() {
            return turnNum;
        },
        reset: function() {
            turn = 'x';
            turnNum = 0;

            for (var i = 0; i < 9; i++) {
                grid[i] = '-';
                gridWithTurns[i] = '-';
                document.getElementById(i + "").innerText = "";
            }
        },
    }

    return self;
}

var gameboard = gameboard();
var computer = computer();

//document.getElementById("gamegrid").onclick = function(e) {
//    var cont = true;
//    if (gameboard.getTurn() === 'x') {
//        if (e.target.id !== "gamegrid" && e.target.innerText === "" && !(e.target.id.indexOf("row") > -1) && e.target.id != "" && e.target.id != null) {
//            //Go where the human clicked
//            gameboard.setSpace(parseInt(e.target.id), e.target);
//            var result = gameboard.checkWin();
//            if (result != "tie" && result != true) {
//                gameboard.toggleTurn();
//            } else {
//                if (result == true) {
//                    cont = false;
//                    console.log(gameboard.getTurn() + " is the winner!");
//                    computer.addGame();
//                } else {
//                    console.log("It's a tie!");
//                }
//                gameboard.reset();
//            }
//
//            //If the game isn't over the computer should make it's move
//            if (cont) {
//                computer.makeMove();
//                if (gameboard.checkWin() ) {
//                    console.log(gameboard.getTurn() + " is the winner");
//                    computer.addGame();
//                    gameboard.reset();
//                } else {
//                    gameboard.toggleTurn();
//                }
//            }
//        }
//    }
//}


//simulate i games
    //Learning AI is x
    var xwins = 0;

    //random AI is y
    var owins = 0;

    //number of ties
    var tie = 0;

    //number of games;
    var gameNum = 0;
    var counter = 0;
    gameboard.setTurn('x');
    while (counter < 10000) {

        if (gameboard.getTurn() == 'o') {
            //dumbAI
            gameboard.setSpace(computer.makeRandomMove());
        } else {
            //smartAI
            computer.makeMove();
        }

        var result = gameboard.checkWin();
        var flag = true;

        if (result == "tie") {
            flag = false;
            tie++;
        } else if (result == true) {
            flag = false;
            if (gameboard.getTurn() == 'x') {
                xwins++;
            } else if (gameboard.getTurn() == 'o') {
                owins++;
            } else {
                alert("What happened? " + gameboard.getTurn());
            }
        } else {
            flag = true;
        }

        if (flag == false) {// game over. Restart
            computer.addGame();
            gameNum++;
            counter++;
            gameboard.reset();
        } else {
            gameboard.toggleTurn();
        }

        if (counter % 1000 == 0) {
            console.log("I'm alive!");
        }
    }
    console.log("x won " + xwins + " times out of " + gameNum + " games");
    console.log("o won " + owins + " times out of " + gameNum + " games");
    console.log("there were " + tie + " ties");
    console.log("The computer player that was on x recognized " + computer.getLearned() + " Scenarios during the games");


//console.log(computer.getScenarios());

