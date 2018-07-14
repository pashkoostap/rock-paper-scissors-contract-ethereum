import Web3 from 'web3';
import * as code from '../bin/contracts/RockPaperScissors.json';

const {
  LOCAL_PROVIDER_URL,
  RINKEBY_PROVIDER_URL,
  CONTRACT_ADDRESS
} = require('../config');

export default class Web3Service {
  constructor() {
    this.bet = null;
    window.addEventListener('load', () => {
      if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
      } else {
        web3 = new Web3(new Web3.providers.HttpProvider(RINKEBY_PROVIDER_URL));
      }

      this.initContract();
      this.getWalletAddress();
    });
  }

  set playersBet(value) {
    this.bet = value;
  }

  get playersBet() {
    return this.bet;
  }

  initContract() {
    this.contract = new web3.eth.Contract(
      JSON.parse(code.abi),
      CONTRACT_ADDRESS
    );
    console.log(this.contract);
  }

  getWalletAddress() {
    web3.eth.getCoinbase().then(wallet => {
      this.wallet = wallet;
      console.log(this.wallet);
    });
  }

  getManager() {
    this.contract.methods
      .getManager()
      .call({ from: this.wallet }, (err, result) => {
        console.log('getManager', result);
      });
  }

  playGame(value) {
    if (this.bet) {
      this.contract.methods.play(this.bet).send(
        {
          from: this.wallet,
          value: web3.utils.toWei(value, 'ether')
        },
        (err, hash) => {
          console.log('play', hash);
        }
      );
    }
  }
}
