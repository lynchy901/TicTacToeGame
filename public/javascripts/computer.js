/**
 * Created by nathan on 3/21/16.
 */

//clicking in between squares causes an error
var computer = function() {
    var scenarios = [];
    var finalComputerMove;

    var self = {
        getRand: function() {
            return Math.floor(Math.random() * 9);
        },
        makeMove: function(space) {
            var obj = self.checkIfExists();
            if (obj.status) {
                var scenario = obj.scenario;

                rand = scenario.boardWithTurns.indexOf(scenario.finalMove);
                if (scenario.finalMove.indexOf('x')) {
                    console.log("Going in spot " + rand + " because I won there before");
                } else {
                    console.log("Going in spot " + rand + " because human won there before");
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
                var arr = []
                for (var i = 0; i < gameboard.getGameArrayWithTurns().length; i++) {arr[i] = gameboard.getGameArrayWithTurns()[i]};
                scenarios.push({board: gameboard.getGameString(), boardWithTurns: arr, finalMove: finalMove, finalComputerMove: finalComputerMove, frequency: 1});
            }

        },
        checkIfExists: function() {
            for (var i = 0; i < scenarios.length; i++) {
                if (self.removeFinalMove(scenarios[i]) === gameboard.getGameString()) {
                    console.log("This has happened before! " + i + " : " + gameboard.getGameString());
                    return {status: true, scenario: scenarios[i]};
                }
            }
            return {status:false};
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

            return newStr;
        }
    }

    return self;
}
