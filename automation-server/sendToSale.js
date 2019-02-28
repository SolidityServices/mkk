const schedule = require('node-schedule');
const getUnprocessedSendToSale = require('./getUnprocessedSendToSale.js');

async function processPoolEntry(time, poolAddress, gasPrice, poolContract, automationsContract) {
  const date = new Date(time * 1000);
  schedule.scheduleJob(date, async () => {
    console.log(`send to sale time triggered scheduler - time: ${time} , poolAddress: ${poolAddress} , gasPrice: ${gasPrice}`);
    // eslint-disable-next-line prefer-destructuring
    console.log('sending Pool.sendToSale tx... Result:');
    const result1 = await poolContract.sendToSale(poolAddress, gasPrice);
    console.log(result1);
    console.log('sending Automations.emitPushSendToSaleCompleted tx... Result:');
    const result2 = await automationsContract.emitPushSendToSaleCompleted(poolAddress, gasPrice);
    console.log(result2);
  });
}

module.exports = {
  async process(automationsContract, poolContract) {
    const unprocessedSendToSale = await getUnprocessedSendToSale.getElements(automationsContract);
    console.log(`send to sale events to process: ${JSON.stringify(unprocessedSendToSale)}`);

    automationsContract.watchNewSendToSaleEvent((error, result) => {
      if (!error) {
        const poolAddress = result.returnValues.pool;
        unprocessedSendToSale[poolAddress] = {
          time: result.returnValues.time,
          gasPrice: result.returnValues.gasPrice,
        };
        processPoolEntry(result.returnValues.time, poolAddress, unprocessedSendToSale, poolContract, automationsContract);

        console.log(`New send to sale event to process: ${result}`);
      } else {
        console.log(error);
      }
    });

    Object.keys(unprocessedSendToSale).forEach((poolAddress) => {
      const { time, gasPrice } = unprocessedSendToSale[poolAddress];
      processPoolEntry(time, poolAddress, gasPrice, unprocessedSendToSale, poolContract, automationsContract);
    });
    console.log('Watching for new events to process and waiting for scheduler to be triggered by send to sale times...');
  },
};
