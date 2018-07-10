pragma solidity ^0.4.17;

contract RockPaperScissors {
  address[] private players;
  address public manager;
  function RockPaperScissors() public {
    manager = msg.sender;
  }

  function play() public payable {
    require(msg.value >= 0.1 ether);
    require(msg.value <= 1 ether);
    players.push(msg.sender);
  }

  function getPlayers() public view returns (address[]) {
    return players;
  }

  function getManager() public view returns (address) {
    return manager;
  }
}