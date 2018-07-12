import Web3Service from './web3service';
import DOMService from './DOMService';
import { findListElement } from './utils';
import './styles.css';
// import * as code from '../bin/contracts/RockPaperScissors.json';

// const { CONTRACT_ADDRESS } = require('../config');
const walletInput = document.querySelector('#wallet');
const sendBtn = document.querySelector('#send');
const getManagerBtn = document.querySelector('#get-manager');
const getPlayersBtn = document.querySelector('#get-players');
const inputValidation = document.querySelector('#input-validation');
const optionsList = document.querySelector('#options');

const web3service = new Web3Service();

getManagerBtn.addEventListener('click', () => {
  web3service.getManager();
});

optionsList.addEventListener('click', e => {
  const listElement = findListElement(e.target);
  if (listElement.id && web3service.playersBet !== listElement.id) {
    [...optionsList.querySelectorAll('li')].forEach(node =>
      DOMService.removeClass(node, 'selected')
    );
    web3service.playersBet = listElement.id;
    DOMService.addClass(listElement, 'selected');
  }
});

sendBtn.addEventListener('click', () => {
  const value = walletInput.value.replace(',', '.');
  if (value.match(/^\d+(\.\d+)*$/)) {
    DOMService.addClass(inputValidation, 'hidden');
    web3service.playGame('rock', value);
  } else {
    DOMService.removeClass(inputValidation, 'hidden');
  }
});

getPlayersBtn.addEventListener('click', () => {
  // contract.methods
  //   .players('0xB2eF2431E3882de15EF699560024067a69c5076C')
  //   .call({ from: walletAddress }, (err, result) => {
  //     console.error('getPlayers', err);
  //     console.log('getPlayers', result);
  //   });
});
