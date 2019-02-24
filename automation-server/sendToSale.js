const schedule = require('node-schedule');
const getUnprocessedSendToSale = require('./getUnprocessedSendToSale.js');

function processPoolEntry(time, poolAddress, gasPrice, poolContract, automationsContract) {
  const date = new Date(time * 1000);
  schedule.scheduleJob(date, () => {
    // eslint-disable-next-line prefer-destructuring
    await poolContract.SendToSale(poolAddress, gasPrice);
    automationsContract.emitPushSendToSaleCompleted(poolAddress);
  });
}

module.exports = {
  async process(automationsContract, poolContract) {
    const unprocessedSendToSale = await getUnprocessedSendToSale.getElements(automationsContract);

    automationsContract.watchNewSendToSaleEvent((error, result) => {
      if (!error) {
        const poolAddress = result.returnValues.pool;
        unprocessedSendToSale[poolAddress] = {
          time: result.returnValues.time,
          gasPrice: result.returnValues.gasPrice,
        };
        processPoolEntry(result.returnValues.time, poolAddress, unprocessedSendToSale, poolContract, automationsContract);

        console.log(result);
      } else {
        console.log(error);
      }
    });
    unprocessedSendToSale.keys().array.forEach((poolAddress) => {
      const { time, gasPrice } = unprocessedSendToSale[poolAddress];
      processPoolEntry(time, poolAddress, gasPrice, unprocessedSendToSale, poolContract, automationsContract);
    });
  },
};
