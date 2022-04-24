// NOTE: below we provide some example accounts.
// DON'T this account in any working environment because everyone can check it and use
// the private keys (this accounts are visible to everyone).

// NOTE: to be able to execute transactions, you need to use an active account with
// a sufficient ALGO balance.

/**
   Check our /docs/algob-config.md documentation (https://github.com/scale-it/algo-builder/blob/master/docs/guide/algob-config.md) for more configuration options and ways how to
  load a private keys:
  + using mnemonic
  + using binary secret key
  + using KMD daemon
  + loading from a file
  + loading from an environment variable
  + ...
*/

// ## ACCOUNTS USING mnemonic ##
const { mkAccounts, algodCredentialsFromEnv } = require("@algo-builder/algob");
let accounts = mkAccounts([
  {
    name: "master",
    addr: "QXJXCKOGSZUSHMZ6OZWEE6DYT6CXG7YVZYMA4CUSHXYZI6EQPLYGM5L6GY",
    mnemonic: "peanut satoshi scan steak color draw caught champion welcome camera pluck jazz during trophy donkey layer crime clever junior harvest skin all vicious ability sail",
  },
  {
    name: "elon-musk",
    addr: "3SAT3JPLIM3TYDPUADM4EXZ4SSUNAR35NV5K4FBIXBJFMBNKPRAXRIWZFQ",
    mnemonic: "arch twelve educate custom fiscal ancient very brick blanket security truth across park cabbage rhythm dutch obey claw bottom actor promote pact wrestle absent beef"
  }, 
  {
    name: "john",
    addr: "UZOSBTKZZPCWK767JMWCBJYXDK27OE2C6CFIPISDDOKWMJCPUW7NWMUJHQ",
    mnemonic: "elevator document arrive aware siren off improve narrow setup pretty trumpet soft copper still tired snake valley turn digital hill giraffe tail unveil absorb deny"
  },
  {
    name: "alice",
    addr: "3WBJVX6SRP3K76NPIZLVE4PYHWAH25I7KXMJIEE6BKEZVG44ESHAXMBLGQ",
    mnemonic: "hurt rescue pioneer level erosion enemy outdoor true talk city raise shop snow basket pear target planet space deliver small legend elevator beauty absorb shrimp"
  }, 
  {
    name: "bob",
    addr: "5JK7ZY5KE2TFPAAL4LVK3XTUJ7NWDGGKIKZ3TI26AFXVDVITP5OIYHEOXQ",
    mnemonic: "afford shove barely eight village frequent canal tent office wire give model primary kiss trash corn physical chuckle solution device black main core abstract galaxy"
    }  

]);

// ## ACCOUNTS loaded from a FILE ##
// const { loadAccountsFromFileSync } = require("@algo-builder/algob");
// const accFromFile = loadAccountsFromFileSync("assets/accounts_generated.yaml");
// accounts = accounts.concat(accFromFile);

/// ## Enabling KMD access
/// Please check https://github.com/scale-it/algo-builder/blob/master/docs/guide/algob-config.md#credentials for more details and more methods.

// process.env.$KMD_DATA = "/path_to/KMD_DATA";
// let kmdCred = KMDCredentialsFromEnv();

// ## Algod Credentials
// You can set the credentials directly in this file:

// ## config for indexer running on local
// const indexerCfg = {
//   host: "http://localhost",
//   port: 8980,
//   token: ""
// };

let defaultCfg = {
  host: "http://localhost",
  port: 4001,
  // Below is a token created through our script in `/infrastructure`
  // If you use other setup, update it accordignly (eg content of algorand-node-data/algod.token)
  token: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  // you can also pass token as an object
  // token: {
  //   "X-Algo-API-Token": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  // },
  accounts: accounts,
  // if you want to load accounts from KMD, you need to add the kmdCfg object. Please read
  // algob-config.md documentation for details.
  // kmdCfg: kmdCfg,
  // you can pass config of indexer (ideally it should be attached to this network's algod node)
  // indexerCfg: indexerCfg
};

// purestake testnet config
let purestakeTestNetCfg = {
  host: "https://testnet-algorand.api.purestake.io/ps2",
  port: "",
  token: {
    "X-API-Key": "Xhkn7v7h972hj7Egx3fGr9RFbfXeGuoD6wSLKDyG",
  },
  accounts: accounts,
};

// You can also use Environment variables to get Algod credentials
// Please check https://github.com/scale-it/algo-builder/blob/master/docs/algob-config.md#credentials for more details and more methods.
// Method 1
process.env.ALGOD_ADDR = "127.0.0.1:4001";
process.env.ALGOD_TOKEN = "algod_token";
let algodCred = algodCredentialsFromEnv();

let envCfg = {
  host: algodCred.host,
  port: algodCred.port,
  token: algodCred.token,
  accounts: accounts,
};

module.exports = {
  networks: {
    default: purestakeTestNetCfg,
    prod: envCfg,
    purestake: purestakeTestNetCfg,
  },
};
