module.exports = {
  async getElements(automationsInstance) {
    const allSendToSale = await automationsInstance.getNewSendToSaleEvent();
    const completedSendToSale = await automationsInstance.getCompletedSendToSaleEvent();

    const unprocessedSendToSale = {};
    allSendToSale.forEach((element) => {
      unprocessedSendToSale[element.returnValues.pool] = {
        time: element.returnValues.time,
        gasPrice: element.returnValues.gasPrice,
      };
    });

    completedSendToSale.forEach((element) => {
      const poolAddress = element.returnValues.pool;
      delete unprocessedSendToSale[poolAddress];
    });

    const sendToSaleTimes = {};

    unprocessedSendToSale.keys().forEach((poolAddress) => {
      const sendToSaleTime = unprocessedSendToSale[poolAddress].time;
      if (sendToSaleTimes[sendToSaleTime]) sendToSaleTimes[sendToSaleTime].push(poolAddress);
      else sendToSaleTimes[sendToSaleTime] = new Array(poolAddress);
    });

    return { unprocessedSendToSale, sendToSaleTimes };
  },
};
