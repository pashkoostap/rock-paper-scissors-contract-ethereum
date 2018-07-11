pragma solidity ^0.4.17;



contract RockPaperScissors {
  struct Player {
    address adr;
    string bit;
  }

  address public manager;

  mapping (address => Player) public players;

  function RockPaperScissors() public {
    manager = msg.sender;
  }

  function play(string bit) public payable {
    require(msg.value >= 0.1 ether);
    require(msg.value <= 1 ether);

    players[msg.sender] = Player({ adr: msg.sender, bit: bit });
  }

  function getManager() public view returns (address) {
    return manager;
  }
}