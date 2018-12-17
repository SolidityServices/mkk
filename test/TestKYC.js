let KYC = artifacts.require("KYC");

contract('KYC contract tests', function(accounts) {
    let ContractInstance;
    let owner = accounts[0];

    it("Adding addresses to the KYC", function() {
        return KYC.deployed().then(async function(instance) {
            ContractInstance = instance;
            let txReceipt = await ContractInstance.addKYCAddress(
            [accounts[1], accounts[2], accounts[3]],
            ['HUN','GER','USA']
            );
            console.log("Adding KYC addresses tx gas cost:", txReceipt.receipt.gasUsed);
            return ContractInstance.kycAddresses(accounts[2]);
        }).then(function(isKYCed) {
            assert.equal(isKYCed, true, "Address is not included in the KYC list");
        });
    });

    it("Removing addresses from the KYC", async function() {
      return KYC.deployed().then(async function(instance) {
            ContractInstance = instance;
            let txReceipt = await ContractInstance.removeKYCAddress(
            [accounts[2], accounts[3]]
            );
            console.log("Removing KYC addresses tx gas cost:", txReceipt.receipt.gasUsed);
            return ContractInstance.kycAddresses(accounts[2]);
        }).then(function(isKYCed) {
          assert.equal(isKYCed, false, "Address is included in the KYC list");
        });
    });
});
