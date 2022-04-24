const { executeTransaction, balanceOf } = require('@algo-builder/algob');
const { types } = require("@algo-builder/web");

const { TransactionType, SignType } = types;

// a helper function used to create fund transaction
function mkParam(senderAccount, receiverAddr, amount, payFlags) {
  return {
    type: TransactionType.TransferAlgo,
    sign: SignType.SecretKey,
    fromAccount: senderAccount,
    toAccountAddr: receiverAddr,
    amountMicroAlgos: amount,
    payFlags: payFlags
  };
};

async function run2 (runtimeEnv, deployer) {
  console.log('[gold]: Script has started execution!');

  // we start with extracting acocunt objects from the config.
  const masterAccount = deployer.accountsByName.get('master');
  const goldOwner = deployer.accountsByName.get('alice');
  const john = deployer.accountsByName.get('john');
  const bob = deployer.accountsByName.get('bob');
  
  for (const act of [masterAccount, goldOwner, john, bob]){
    let accountInfo = await deployer.algodClient.accountInformation(act.addr).do();
    console.log(`${act.name}: ${accountInfo.amount/1000000} Algos`, );

  }
  console.log("-------------");
  const message = 'funding account';
  //await executeTransaction(deployer, mkParam(masterAccount, goldOwner.addr, 2e6, { note: message }));
  //await executeTransaction(deployer, mkParam(masterAccount, john.addr, 1e6, { note: message }));
  //await executeTransaction(deployer, mkParam(masterAccount, bob.addr, 1e6, { note: message }));

  for (const act of [masterAccount, goldOwner, john, bob]){
    let accountInfo = await deployer.algodClient.accountInformation(act.addr).do();
    console.log(`${act.name}: ${accountInfo.amount/1000000} Algos`, );

  }

  console.log("done");
}

// This is an entry function in our script (a default, exported function)
async function run3 (runtimeEnv, deployer) {
  console.log('[gold]: Script has started execution!');

  // we start with extracting acocunt objects from the config.
  const masterAccount = deployer.accountsByName.get('master');
  const goldOwner = deployer.accountsByName.get('alice');
  const john = deployer.accountsByName.get('john');
  const bob = deployer.accountsByName.get('bob');

  // Let's deploy ASA. The following commnad will open the `assets/asa.yaml` file and search for
  // the `gold` ASA. The transaction can specify standard transaction parameters. If skipped
  // node suggested values will be used.
  const asaInfo = await deployer.deployASA('gold', {
    creator: goldOwner
    // totalFee: 1001,
    // feePerByte: 100,
    // firstValid: 10,
    // validRounds: 1002
  });
  console.log(asaInfo);

  // to interact with an asset we need asset ID. We can get it from the returned object:
  const assetID = asaInfo.assetIndex;

  // In asa.yaml we only added `john` to opt-in accounts. Let's add `bob` as well using the
  // script;
  await deployer.optInAccountToASA('gold', 'bob', {});

  // we can inspect the balance of the goldOnwer. It should equal to the `total` value defined
  // in the asa.yaml.
  const x = await balanceOf(deployer, goldOwner.addr, assetID);

  console.log('[gold]: Script execution has finished!', assetID, x);
}

async function run (runtimeEnv, deployer) {
  console.log('[gold]: Script has started execution!');

  // we start with extracting acocunt objects from the config.
  const masterAccount = deployer.accountsByName.get('master');
  const goldOwner = deployer.accountsByName.get('alice');
  const john = deployer.accountsByName.get('john');
  const bob = deployer.accountsByName.get('bob');

  const assetID = 85776331;
  const x = await balanceOf(deployer, goldOwner.addr, assetID);
  console.log('[gold]: Script execution has finished!', assetID, x);
}

module.exports = { default: run };