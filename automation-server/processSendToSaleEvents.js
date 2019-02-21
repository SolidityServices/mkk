export default async function (automationsInstance) {
  const allSendToSale = await automationsInstance.getNewSendToSaleEvent();
  const completedSendToSale = await automationsInstance.getCompletedSendToSaleEvent();

  const unprocessedSendToSale = {};
  allSendToSale.forEach((element) => {
    unprocessedSendToSale[element.args.pool] = {
      time: element.args.time,
      gasPrice: element.args.gasPrice,
    };
  });

  completedSendToSale.forEach((element) => {
    const poolAddress = element.args.pool;
    delete unprocessedSendToSale[poolAddress];
  });

  automationsInstance.watchNewSendToSaleEvent((error, result) => {
    if (!error) {
      unprocessedSendToSale[result.args.pool] = {
        time: result.args.time,
        gasPrice: result.args.gasPrice,
      };
    } else {
      console.log(error);
    }
  });
}
