import TruffleContract from 'truffle-contract';
import kycArtifact from '../../../build/contracts/KYC.json';

export default class KYC {
  constructor(provider, account, web3) {
    this.kyc = TruffleContract(kycArtifact);
    this.kyc.setProvider(provider);
    this.account = account;
    this.web3 = web3;
  }

  async getAddress() {
    const instance = await this.kyc.deployed();
    return instance.address;
  }

  /**
   * Add a new pool admin address (only creator)
   *   *
   * @param {string[]} adminAddressList address of new admin
   */
  async addAdmin(adminAddressList) {
    const instance = await this.kyc.deployed();
    return instance.addAdmin(adminAddressList, { from: this.account });
  }

  /**
   * Remove admin by address (only owner)
   *   *
   * @param {string[]} adminAddressList address of admin to remove
   */
  async removeAdmin(adminAddressList) {
    const instance = await this.kyc.deployed();
    return instance.removeAdmin(adminAddressList, { from: this.account });
  }

  async addKYCAddress(kycAddress, country) {
    const instance = await this.kyc.deployed();
    return instance.addKYCAddress(kycAddress, country, { from: this.account });
  }

  async addKYCAddresses(kycAddress, country) {
    const instance = await this.kyc.deployed();
    return instance.addKYCAddresses(kycAddress, country, { from: this.account });
  }

  async removeKYCAddress(kycAddress, country) {
    const instance = await this.kyc.deployed();
    return instance.removeKYCAddress(kycAddress, country, { from: this.account });
  }
}
