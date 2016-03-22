/**
 * Created by nathan on 3/21/16.
 */
var computer = function() {
    var scenarios = [];
    var finalComputerMove;

    var self = {
        getRand: function() {
            return Math.floor(Math.random() * 9);
        },
        makeMove: function(space) {
            if (self.checkIfExists().status) {
                var scenario = self.checkIfExists().scenario;

                if (scenario.finalMove.indexOf('x') > -1) {//this means the human player won
                    rand = scenario.boardWithTurns.indexOf(scenario.finalMove);
                    console.log("Going in spot " + rand + " because human won there last time");
                }
            } else {
                if (isNaN(space)) {
                    var gamestring = gameboard.getGameString();
                    var rand = self.getRand();
                    if (gamestring.charAt(rand) !== '-') {
                        while (gamestring.charAt(rand) !== '-') {
                            rand = self.getRand();
                        }
                    }
                } else {
                    rand = space;
                }
            }

            finalComputerMove = 'o' + gameboard.getTurnNum();
            gameboard.setSpace(rand,document.getElementById(rand + ""));
        },
        addGame: function() {
            var flag = false;
            for (var i = 0; i < scenarios.length; i++) {
                if (scenarios[i].board === gameboard.getGameString()) {
                    scenarios[i].frequency = scenarios[i].frequency + 1;
                    flag = true;
                }
            }
            if (!flag) {
                var finalMove = gameboard.getTurn() + (gameboard.getTurnNum() - 1);
                scenarios.push({board: gameboard.getGameString(), boardWithTurns: gameboard.getGameArrayWithTurns(), finalMove: finalMove, finalComputerMove: finalComputerMove, frequency: 1});
            }

            console.log(scenarios);
        },
        checkIfExists: function() {
            for (var i = 0; i < scenarios.length; i++) {
                if (self.removeFinalMove(scenarios[i]) === gameboard.getGameString()) {
                    alert("HERE");
                    console.log("This has happened before! " + i + " : " + gameboard.getGameString());
                    return {status: true, scenario: scenarios[i]};
                }
            }
            return false;
        },
        removeFinalMove: function(str) { //Remove the winning move so that

            var indexH = str.boardWithTurns.indexOf(str.finalMove);
            var indexC = str.boardWithTurns.indexOf(str.finalComputerMove);

            var charArr = str.board.split('');
            var newStr = "";

            charArr[indexH] = '-';
            charArr[indexC] = '-';
            for (var i = 0; i < charArr.length; i++) {
                newStr+= charArr[i];
            }

            console.log(newStr);
            return newStr;
        }
    }

    return self;
}
