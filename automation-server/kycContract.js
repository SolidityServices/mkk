import TruffleContract from 'truffle-contract';

export default class KYC {
  constructor(provider, account, web3, kycArtifact) {
    this.kyc = TruffleContract(kycArtifact);
    this.kyc.setProvider(provider);
    this.account = account;
    this.web3 = web3;
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
