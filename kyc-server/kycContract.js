import TruffleContract from 'truffle-contract';

class KYC {
  constructor(provider, account, kycArtifact) {
    this.kyc = TruffleContract(kycArtifact);
    this.kyc.setProvider(provider);
    this.account = account;
  }

  async addKYCAddress(kycAddress, country) {
    const instance = await this.kyc.deployed();
    return instance.addKYCAddress(kycAddress, country, { from: this.account });
  }

  async addKYCAddresses(kycAddresses, country) {
    const instance = await this.kyc.deployed();
    return instance.addKYCAddresses(kycAddresses, country, { from: this.account });
  }
}

module.exports.KYC = KYC;
