import Web3 from 'web3';
const { LOCAL_PROVIDER_URL } = require('../config');

window.addEventListener('load', () => {
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider(LOCAL_PROVIDER_URL));
  }
});
