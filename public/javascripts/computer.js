/**
 * Created by nathan on 3/21/16.
 */

//clicking in between squares causes an error
var computer = function() {
    var scenarios = [];
    var finalComputerMove;
    var learned = 0;

    var self = {
        getLearned: function() {
            return learned;
        },
        getScenarios: function() {
            return scenarios;
        },
        getRand: function() {
            return Math.floor(Math.random() * 9);
        },
        makeRandomMove: function() {
            var gamestring = gameboard.getGameString();
            var rand = self.getRand();
            if (gamestring.charAt(rand) !== '-') {
                while (gamestring.charAt(rand) !== '-') {
                    rand = self.getRand();
                }
            }
            return rand;
        },
        makeMove: function() {
            var obj = self.checkIfExists();
            if (obj.status) {
                var scenario = obj.scenario;
                var space;

                space = scenario.boardWithTurns.indexOf(scenario.finalMove);
                if (scenario.finalMove.indexOf('x')) {
                    print("Going in spot " + space + " because I won there before");
                } else {
                    print("Going in spot " + space + " because human won there before");
                }
                learned++;


            } else {
                space = self.makeRandomMove();
            }

            finalComputerMove = 'o' + gameboard.getTurnNum();
            gameboard.setSpace(space);
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
