import TruffleContract from 'truffle-contract';
import kycArtifact from '../../../build/contracts/KYC.json';

export default class KYC {
  constructor(provider) {
    this.kyc = TruffleContract(kycArtifact);
    this.kyc.setProvider(provider);
  }

  async getAddress() {
    const instance = await this.kyc.deployed();
    return instance.address;
  }
}
