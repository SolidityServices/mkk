const express = require('express');

module.exports = {
  async hadnle(app, kycInstance, port) {
    app.use(express.json());

    let kycObjectList = {};

    app.post('/kyc', (request, response) => {
      kycObjectList = request.body;
      const addressList = [];
      const countryList = [];
      kycObjectList.forEach((element) => {
        addressList.push(element.address);
        countryList.push(element.country);
      });
      kycInstance.addKYCAddresses(addressList, countryList);
      console.log(kycObjectList); // your JSON
      response.send(request.body); // echo the result back
    });

    app.listen(port);
  },
};
