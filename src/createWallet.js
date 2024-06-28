//IMPORTANDO AS DEPENDÊNCIAS
const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

//DEFINIR A REDE
const network = bitcoin.networks.testnet;

//DERIVAÇÃO DE CARTEIRAS HIERARCHICAL DETERMINISTIC - HD
const path = `m/49'/1'/0'/0`;

//CRIANDO CONJUNTO DE PALAVRAS-SENHA NA CRIAÇÃO DO SEED
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

//CRIANDO A RAIZ DA CARTEIRA
let root = bip32.fromSeed(seed, network);

//CRIANDO UMA CONTA - PAR PRIVATE-PUBLIC KEYS
let account = root.derivePath(path);
let node = account.derive(0).derive(0);

//CRIANDO O ENDEREÇO PÚBLICO
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network
}).address;

//SAÍDAS DO PROCESSAMENTO
console.log('CARTEIRA GERADA COM SUCESSO!');
console.log('Endereço: ', btcAddress);
console.log('Chave Privada: ', node.toWIF());
console.log('Seed: ', mnemonic);