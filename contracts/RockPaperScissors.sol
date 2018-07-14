pragma solidity ^0.4.17;

contract RockPaperScissors {
  struct Player {
    address adr;
    string bet;
  }

  address private manager;
  mapping (string => mapping(string => int)) bets;
  uint private iterCount;
  mapping (uint => Player) private players;

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
    require(iterCount < 2);

    if (iterCount < 2) {
      players[iterCount] = Player({ adr: msg.sender, bet: bet });
      iterCount = iterCount + 1;
    } else {
      pickWinner();
    }
  }

  function getManager() public view returns (address) {
    return manager;
  }

  function resetGame() private {
    for (uint index = 0; index < iterCount; index++) {
      delete players[index];
    }
    iterCount = 0;
  }

  function pickWinner() public view returns(uint) {
    require(iterCount == 2);
    
    return bets[players[0].bet][players[1].bet];
  }
}