const Web3 = require('web3');
const express = require('express');


module.exports = {
  async handle(app, kycInstance, port, web3) {
    app.use(express.json());

    let kycObjectList = {};

    app.post('/kyc', async (request, response) => {
      kycObjectList = request.body;
      const addressList = [];
      const countryList = [];
      console.log(`incoming request: ${JSON.stringify(kycObjectList)}`);

      kycObjectList.forEach((element) => {
        addressList.push(element.address);
        countryList.push(Web3.utils.utf8ToHex(element.country.toUpperCase()));
      });

      console.log('sending transaction...');
      kycInstance.addKYCAddresses(addressList, countryList).then((result) => {
        console.log(`Tx hash: ${result.tx}`);
        web3.eth.getTransactionReceipt(result.tx).then((reciept) => {
          console.log(`Tx reciept: ${JSON.stringify(reciept)}`); // your JSON
          response.send(reciept); // echo the result back
        });
      });
    });

    try {
      app.listen(port);
      console.log(`listening at port: ${port}`);
    } catch (e) {
      console.log(`error: ${e}`);
    }
  },
};
