import Web3Service from './web3service';
import { findListElement, addClass, removeClass } from './utils';

import './styles.css';

const web3service = new Web3Service();

const walletInput = document.querySelector('#wallet');
const sendBtn = document.querySelector('#send');
const getManagerBtn = document.querySelector('#get-manager');
const getPlayersBtn = document.querySelector('#get-players');
const inputValidation = document.querySelector('#input-validation');
const optionsList = document.querySelector('#options');

getManagerBtn.addEventListener('click', () => {
  web3service.getManager();
});

optionsList.addEventListener('click', e => {
  const listElement = findListElement(e.target);
  if (listElement.id && web3service.playersBet !== listElement.id) {
    [...optionsList.querySelectorAll('li')].forEach(node =>
      removeClass(node, 'selected')
    );
    web3service.playersBet = listElement.id;
    addClass(listElement, 'selected');
  }
});

sendBtn.addEventListener('click', () => {
  const value = walletInput.value.replace(',', '.');

  if (value.match(/^\d+(\.\d+)*$/)) {
    addClass(inputValidation, 'hidden');
    web3service.playGame(value, () => {
      [...optionsList.querySelectorAll('li')].forEach(node =>
        removeClass(node, 'selected')
      );
      walletInput.value = '';
    });
  } else {
    removeClass(inputValidation, 'hidden');
  }
});

getPlayersBtn.addEventListener('click', () => {});
