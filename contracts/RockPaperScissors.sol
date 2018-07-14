pragma solidity ^0.4.17;

contract RockPaperScissors {
  struct Player {
    address adr;
    string bet;
    uint value;
  }

  address private manager;
  mapping (string => mapping(string => int)) bets;
  int private iterCount = 0;
  mapping (int => Player) private players;

  function RockPaperScissors() public {
    manager = msg.sender;
    bets["rock"]["rock"] = -1;
    bets["rock"]["paper"] = 1;
    bets["rock"]["scissors"] = 0;
    bets["paper"]["rock"] = 0;
    bets["paper"]["paper"] = -1;
    bets["paper"]["scissors"] = 1;
    bets["scissors"]["rock"] = 1;
    bets["scissors"]["paper"] = 0;
    bets["scissors"]["scissors"] = -1;
  }

  function play(string bet) public payable {
    require(msg.value >= 0.1 ether);

    players[iterCount] = Player({ adr: msg.sender, bet: bet, value: msg.value });
    iterCount = iterCount + 1;

    if (iterCount == 2) {
      pickWinner();
    }
  }

  function getManager() public view returns (address) {
    return manager;
  }

  function resetGame() private {
    for (int index = 0; index < iterCount; index++) {
      delete players[index];
    }
    iterCount = 0;
  }

  function pickWinner() private {
    int winnerIndex = bets[players[0].bet][players[1].bet];

    if (winnerIndex != -1) {
      players[winnerIndex].adr.transfer(this.balance);
    } else {
      players[0].adr.transfer(players[0].value);
      players[1].adr.transfer(players[1].value);
    }

    resetGame();
  }
}