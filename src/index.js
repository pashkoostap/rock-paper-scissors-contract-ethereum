import './web3';
import './styles.css';
import * as code from '../bin/contracts/RockPaperScissors.json';

const { CONTRACT_ADDRESS } = require('../config');
const walletInput = document.querySelector('#wallet');
const sendBtn = document.querySelector('#send');
const getManagerBtn = document.querySelector('#get-manager');
const getPlayersBtn = document.querySelector('#get-players');

let walletAddress = '';
let contract;

walletInput.addEventListener('input', console.log);

getManagerBtn.addEventListener('click', () => {
  web3.eth.getCoinbase().then(wallet => {
    walletAddress = wallet;
    contract = new web3.eth.Contract(JSON.parse(code.abi), CONTRACT_ADDRESS);

    contract.methods
      .getManager()
      .call({ from: walletAddress }, (err, result) => {
        console.error('getManager', err);
        console.log('getManager', result);
      });
  });

  var subscription = web3.eth
    .subscribe('newBlockHeaders', function(error, result) {
      if (!error) console.log(result);
    })
    .on('data', function(log) {
      console.log(log);
    });
});

sendBtn.addEventListener('click', () => {
  contract.methods
    .play()
    .send({ from: walletAddress, value: 1000000000000000000 }, (err, hash) => {
      console.error('play', err);
      console.log('play', hash);
    });
});

getPlayersBtn.addEventListener('click', () => {
  contract.methods.getPlayers().call({ from: walletAddress }, (err, result) => {
    console.error('getPlayers', err);
    console.log('getPlayers', result);
  });
});
