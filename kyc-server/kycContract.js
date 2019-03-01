import TruffleContract from 'truffle-contract';

class KYC {
  constructor(provider, account, kycArtifact, gasPrice) {
    this.kyc = TruffleContract(kycArtifact);
    this.kyc.setProvider(provider);
    this.account = account;
    this.gasPrice = gasPrice;
  }

  async addKYCAddress(kycAddress, country) {
    const instance = await this.kyc.deployed();
    return instance.addKYCAddress(kycAddress, country, { from: this.account, gasPrice: this.gasPrice });
  }

  async addKYCAddresses(kycAddresses, country) {
    const instance = await this.kyc.deployed();
    return instance.addKYCAddresses(kycAddresses, country, { from: this.account, gasPrice: this.gasPrice });
  }
}

module.exports.KYC = KYC;
