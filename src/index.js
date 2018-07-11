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
  const value = walletInput.value.replace(',', '.');

  contract.methods.play('rock').send(
    {
      from: walletAddress,
      value: web3.utils.toWei(value, 'ether')
    },
    (err, hash) => {
      console.error('play', err);
      console.log('play', hash);
    }
  );
});

getPlayersBtn.addEventListener('click', () => {
  contract.methods
    .players('0xB2eF2431E3882de15EF699560024067a69c5076C')
    .call({ from: walletAddress }, (err, result) => {
      console.error('getPlayers', err);
      console.log('getPlayers', result);
    });
});
