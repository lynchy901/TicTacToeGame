/**
 * Created by nathan on 3/21/16.
 */
var debug = false;

function print(data, override) {
    if (debug || override) {
        console.log(data);
    }
}

var gameboard = function() {
    var grid = ['-', '-', '-',
                '-', '-', '-',
                '-', '-', '-'];
    var turn = 'x';

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
        setSpace: function(index, target) {
            if (!(index >= 0 && index <= 8)) {
                alert("ERROR: Index out of bounds");
            } else {
                grid[index] = self.getTurn();
                target.innerText = self.getTurn();
            }
        },
        checkWin: function() {

            //check tie
            if (!(grid.indexOf('-') > -1)) {
                alert("it's a tie!");
            }

            //check horizontally
            for (var row = 0; row < 7; row+= 3) {
                print("comparing " + (row) + " : " + (row+1) + " and " + row + " : " + (row+2));
                if (isEqualTo(grid[row], grid[row + 1]) && isEqualTo(grid[row], grid[row+2])) {
                    return true;
                }
            }

            //check vertically
            for (var col = 0; col < 3; col++) {
                print("comparing " + (col) + " : " + (col+3) + " and " + col + " : " + (col+6));
                if (isEqualTo(grid[col], grid[col + 3]) && isEqualTo(grid[col], grid[col+6])) {
                    return true;
                }
            }

            //check diagonally
            print("comparing 0 : 4 and 0 : 8");
            print("comparing 2 : 4 and 2 : 6");
            if ((isEqualTo(grid[0], grid[4]) && isEqualTo(grid[0], grid[8])) || (isEqualTo(grid[2], grid[4]) && isEqualTo(grid[2], grid[6]))) {
                return true;
            }

            return false;
        },
        toggleTurn: function () {
            if (turn === 'x') {
                turn = 'o';
            } else {
                turn = 'x';
            }
        },
        setTurn: function (newTurn) {
            if (newTurn !== "x" || turn !== 'o') { // NaN is the only value not equal to itself
                alert("ERROR: must be x or o");
            } else {
                turn = newTurn;
            }
        },
        getTurn: function () {
            return turn;
        },
        reset: function() {
            turn = 'x';
            for (var i = 0; i < 9; i++) {
                grid[i] = '-';
                document.getElementById(i + "").innerText = "";
            }
        }
    }

    return self;
}

var gameboard = gameboard();

//click listener for human player use
document.getElementById("gamegrid").onclick = function(e) {
    if (e.target.id !== "gamegrid" && e.target.innerText === "") {
        gameboard.setSpace(parseInt(e.target.id), e.target);
        if (gameboard.checkWin()) {
            alert(gameboard.getTurn() + " is the winner!");
            gameboard.reset();
        } else {
            gameboard.toggleTurn();
        }
    }
}



