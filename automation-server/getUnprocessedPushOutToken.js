export default async function (automationsInstance) {
  const allPushOutToken = await automationsInstance.getNewPushOutTokenEvent();
  const completedPushOutToken = await automationsInstance.getCompletedPushOutTokenEvent();

  const unprocessedPushOutToken = {};
  allPushOutToken.forEach((element) => {
    unprocessedPushOutToken[element.args.recipient] = {
      pool: element.args.pool,
      gasPrice: element.args.gasPrice,
    };
  });

  completedPushOutToken.forEach((element) => {
    const recipientAddress = element.args.recipient;
    delete unprocessedPushOutToken[recipientAddress];
  });

  return unprocessedPushOutToken;
}
