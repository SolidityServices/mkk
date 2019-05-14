const schedule = require('node-schedule');
const getUnprocessedSendToSale = require('./getUnprocessedSendToSale.js');

async function processPoolEntry(time, poolAddress, gasPrice, poolContract, automationsContract, web3) {
  const date = new Date(time * 1000);
  const now = new Date();
  if (date <= now) { //if older, execute it
    console.log(`send to sale time triggered scheduler - time: ${time} , poolAddress: ${poolAddress} , gasPrice: ${gasPrice}`);
    // eslint-disable-next-line prefer-destructuring
    console.log('sending Pool.sendToSale tx... Result:');
    poolContract.sendToSale(poolAddress, gasPrice).then((txResult) => {
      console.log(`Tx hash: ${txResult.tx}`);
      web3.eth.getTransactionReceipt(txResult.tx).then((reciept) => {
        console.log(`Tx reciept: ${JSON.stringify(reciept)}`);
      });
    }).catch((error) => {
      console.log(error);
    });
    console.log('sending Automations.emitPushSendToSaleCompleted tx... Result:');
    automationsContract.emitSendToSaleCompleted(poolAddress, gasPrice).then((txResult) => {
      console.log(`Tx hash: ${txResult.tx}`);
      web3.eth.getTransactionReceipt(txResult.tx).then((reciept) => {
        console.log(`Tx reciept: ${JSON.stringify(reciept)}`);
      });
    }).catch((error) => {
      console.log(error);
    });
  } else {
    schedule.scheduleJob(date, async () => {
      console.log(`send to sale time triggered scheduler - time: ${time} , poolAddress: ${poolAddress} , gasPrice: ${gasPrice}`);
      // eslint-disable-next-line prefer-destructuring
      console.log('sending Pool.sendToSale tx... Result:');
      poolContract.sendToSale(poolAddress, gasPrice).then((txResult) => {
        console.log(`Tx hash: ${txResult.tx}`);
        web3.eth.getTransactionReceipt(txResult.tx).then((reciept) => {
          console.log(`Tx reciept: ${JSON.stringify(reciept)}`);
        });
      }).catch((error) => {
        console.log(error);
      });
      console.log('sending Automations.emitPushSendToSaleCompleted tx... Result:');
      automationsContract.emitSendToSaleCompleted(poolAddress, gasPrice).then((txResult) => {
        console.log(`Tx hash: ${txResult.tx}`);
        web3.eth.getTransactionReceipt(txResult.tx).then((reciept) => {
          console.log(`Tx reciept: ${JSON.stringify(reciept)}`);
        });
      }).catch((error) => {
        console.log(error);
      });
    });
  }
}

module.exports = {
  async process(automationsContract, poolContract, web3) {
    const unprocessedSendToSale = await getUnprocessedSendToSale.getElements(automationsContract);
    console.log(`send to sale events to process: ${JSON.stringify(unprocessedSendToSale)}`);

    automationsContract.watchNewSendToSaleEvent((error, result) => {
      if (!error) {
        const poolAddress = result.returnValues.pool;
        unprocessedSendToSale[poolAddress] = {
          time: result.returnValues.time,
          gasPrice: result.returnValues.gasPrice,
        };
        processPoolEntry(result.returnValues.time, poolAddress, poolContract, automationsContract, web3);

        console.log(`New send to sale event to process: ${result}`);
      } else {
        console.log(error);
      }
    });

    Object.keys(unprocessedSendToSale).forEach((poolAddress) => {
      const { time, gasPrice } = unprocessedSendToSale[poolAddress];
      processPoolEntry(time, poolAddress, gasPrice, poolContract, automationsContract, web3);
    });
    console.log('Watching for new events to process and waiting for scheduler to be triggered by send to sale times...');
  },
};
