const getUnprocessedPushOutToken = require('./getUnprocessedPushOutToken.js');

function processPoolEntry(poolAddress, unprocessedPushOutToken, recipientsByPools, poolContract, automationsContract) {
  poolContract.watchTokensRecievedEventOnce(poolAddress, (error, result) => {
    if (!error) {
      const recipientAddressArray = recipientsByPools[poolAddress];
      recipientAddressArray.forEach((recipientAddress) => {
        // eslint-disable-next-line prefer-destructuring
        const gasPrice = unprocessedPushOutToken[recipientAddress].gasPrice;
        await poolContract.pushOutToken(poolAddress, recipientAddress, gasPrice);
        automationsContract.emitPushOutTokenCompleted(poolAddress, recipientAddress);
      });
      console.log(result);
    } else {
      console.log(error);
    }
  });
}

module.exports = {
  async process(automationsContract, poolContract) {
    const { unprocessedPushOutToken, recipientsByPools } = await getUnprocessedPushOutToken.getElements(automationsContract);

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
          processPoolEntry(newPoolAddress, unprocessedPushOutToken, recipientsByPools, poolContract, automationsContract);
        }
        console.log(result);
      } else {
        console.log(error);
      }
    });

    recipientsByPools.keys().forEach((poolAddress) => {
      processPoolEntry(poolAddress, unprocessedPushOutToken, recipientsByPools, poolContract, automationsContract);
    });
  },
};
