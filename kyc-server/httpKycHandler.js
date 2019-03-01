const Web3 = require('web3');
const express = require('express');


module.exports = {
  async handle(app, kycInstance, port) {
    app.use(express.json());

    let kycObjectList = {};

    app.post('/kyc', async (request, response) => {
      kycObjectList = request.body;
      const addressList = [];
      const countryList = [];
      console.log(`incoming request: ${kycObjectList}`);

      kycObjectList.forEach((element) => {
        addressList.push(element.address);
        countryList.push(Web3.utils.utf8ToHex(element.country.toUpperCase()));
      });

      console.log('sending transaction...');
      const reciept = await kycInstance.addKYCAddresses(addressList, countryList);
      console.log(reciept); // your JSON
      response.send(reciept); // echo the result back
    });

    try {
      app.listen(port);
      console.log(`listening at port: ${port}`);
    } catch (e) {
      console.log(`error: ${e}`);
    }
  },
};
