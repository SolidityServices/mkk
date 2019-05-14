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

    return unprocessedSendToSale;
  },
};
