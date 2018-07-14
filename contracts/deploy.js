const fs = require('fs');
const path = require('path');
const solc = require('solc');
const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');

const {
  LOCAL_PROVIDER_URL,
  RINKEBY_PROVIDER_URL,
  MNEMONIC_PHRASE
} = require('../config');
const source = fs.readFileSync(
  path.resolve(__dirname, 'RockPaperScissors.sol'),
  'utf-8'
);
const code = solc.compile(source, 1);
debugger;
const { interface, bytecode } = code.contracts[':RockPaperScissors'];

const provider = new HDWalletProvider(MNEMONIC_PHRASE, RINKEBY_PROVIDER_URL);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  const contract = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: `0x${bytecode}` })
    .send({ from: accounts[0], gas: '1000000' });

  console.log(contract);

  process.exit(0);
};

deploy();
