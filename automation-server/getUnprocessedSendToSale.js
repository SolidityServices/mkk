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

  const sendToSaleTimes = {};

  unprocessedSendToSale.keys().forEach((element) => {
    if (sendToSaleTimes[unprocessedSendToSale[element].time]) sendToSaleTimes[unprocessedSendToSale[element].time].push(unprocessedSendToSale[element].pool);
    else sendToSaleTimes[unprocessedSendToSale[element].time] = [unprocessedSendToSale[element].pool];
  });

  return { unprocessedSendToSale, sendToSaleTimes };
}
