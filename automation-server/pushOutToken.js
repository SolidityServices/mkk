const getUnprocessedPushOutToken = require('./getUnprocessedPushOutToken.js');

async function processPoolEntry(poolAddress, unprocessedPushOutToken, recipientsByPools, poolContract, automationsContract, web3) {
  poolContract.watchTokensRecievedEventOnce(poolAddress, async (error, result) => {
    if (!error) {
      console.log('push out token processing triggered by tokens received event: ');
      console.log(result);
      const recipientAddressArray = recipientsByPools[poolAddress];
      console.log(`entries to process:${recipientAddressArray}`);

      recipientAddressArray.forEach(async (recipientAddress) => {
        // eslint-disable-next-line prefer-destructuring
        const gasPrice = unprocessedPushOutToken[recipientAddress].gasPrice;
        console.log(`entry to process - recipient: ${recipientAddress} , poolAddress: ${poolAddress} , gasPrice: ${gasPrice}`);
        console.log('sending Pool.pushOutToken tx... Result:');
        poolContract.pushOutToken(poolAddress, recipientAddress, gasPrice).then((txResult) => {
          console.log(`Tx hash: ${txResult.tx}`);
          web3.eth.getTransactionReceipt(txResult.tx).then((reciept) => {
            console.log(`Tx reciept: ${JSON.stringify(reciept)}`);
          });
        }).catch((txError) => {
          console.log(txError);
        });
        console.log('sending Automations.emitPushOutTokenCompleted tx... Result:');
        automationsContract.emitPushOutTokenCompleted(poolAddress, recipientAddress, gasPrice).then((txResult) => {
          console.log(`Tx hash: ${txResult.tx}`);
          web3.eth.getTransactionReceipt(txResult.tx).then((reciept) => {
            console.log(`Tx reciept: ${JSON.stringify(reciept)}`);
          });
        }).catch((txError) => {
          console.log(txError);
        });
      });
    } else {
      console.log(error);
    }
  });
}

module.exports = {
  async process(automationsContract, poolContract, web3) {
    const { unprocessedPushOutToken, recipientsByPools } = await getUnprocessedPushOutToken.getElements(automationsContract);
    console.log(`push out token events to process: ${JSON.stringify(unprocessedPushOutToken)}`);

    automationsContract.watchNewPushOutTokenEvent((error, result) => {
      if (!error) {
        const newRecipientAddress = result.returnValues.recipient;
        const newPoolAddress = result.returnValues.pool;

        unprocessedPushOutToken[newRecipientAddress] = {
          pool: newPoolAddress,
          gasPrice: result.returnValues.gasPrice,
        };

        if (recipientsByPools[newPoolAddress]) recipientsByPools[newPoolAddress].push(newRecipientAddress);
        else {
          recipientsByPools[newPoolAddress] = new Array(newRecipientAddress);
          processPoolEntry(newPoolAddress, unprocessedPushOutToken, recipientsByPools, poolContract, automationsContract, web3);
        }
        console.log(`New push out token event to process: ${result}`);
      } else {
        console.log(error);
      }
    });
    Object.keys(recipientsByPools).forEach((poolAddress) => {
      processPoolEntry(poolAddress, unprocessedPushOutToken, recipientsByPools, poolContract, automationsContract, web3);
    });
    console.log('Watching for new events to process and triggering tokens received events...');
  },
};
