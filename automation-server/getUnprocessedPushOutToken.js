export default async function (automationsInstance) {
  const allPushOutToken = await automationsInstance.getNewPushOutTokenEvent();
  const completedPushOutToken = await automationsInstance.getCompletedPushOutTokenEvent();

  const unprocessedPushOutToken = {};
  allPushOutToken.forEach((element) => {
    unprocessedPushOutToken[element.returnValues.recipient] = {
      pool: element.returnValues.pool,
      gasPrice: element.returnValues.gasPrice,
    };
  });

  completedPushOutToken.forEach((element) => {
    const recipientAddress = element.returnValues.recipient;
    delete unprocessedPushOutToken[recipientAddress];
  });

  const recipientsByPools = {};

  unprocessedPushOutToken.keys().forEach((recipientAddress) => {
    const poolAddress = unprocessedPushOutToken[recipientAddress].pool;
    if (recipientsByPools[poolAddress]) recipientsByPools[poolAddress].push(recipientAddress);
    else recipientsByPools[poolAddress] = new Array(recipientAddress);
  });

  return { unprocessedPushOutToken, recipientsByPools };
}
