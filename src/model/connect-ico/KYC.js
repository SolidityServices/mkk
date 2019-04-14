import TruffleContract from 'truffle-contract';
import kycArtifact from '../../../build/contracts/KYC.json';

export default class KYC {
  constructor(provider, account, web3) {
    this.kyc = TruffleContract(kycArtifact);
    this.kyc.setProvider(provider);
    this.account = account;
    this.web3 = web3;
  }

  /**
   * Returns contract address
   * @return {string} KYC contract address
   */
  async getAddress() {
    const instance = await this.kyc.deployed();
    return instance.address;
  }

  /**
   * Check if given address is in KYC registry
   * @param {string} address to check
   */
  async checkKYC(address) {
    const instance = await this.kyc.deployed();
    return instance.checkKYC(address, { from: this.account });
  }

  /**
   * Check if given address is admin address in KYC registry
   * @param {string} address to check
   */
  async isAdmin(address) {
    const instance = await this.kyc.deployed();
    return instance.admins(address, { from: this.account });
  }

  /**
   * Add a new pool admin address (only creator)
   * @param {string[]} adminAddressList address of new admin
   */
  async addAdmin(adminAddressList) {
    const instance = await this.kyc.deployed();
    return instance.addAdmin(adminAddressList, { from: this.account });
  }

  /**
   * Remove admin by address (only owner)
   * @param {string[]} adminAddressList address of admin to remove
   */
  async removeAdmin(adminAddressList) {
    const instance = await this.kyc.deployed();
    return instance.removeAdmin(adminAddressList, { from: this.account });
  }

  /**
   * Add single address to KYC registry (only admin)
   * @param {string[]} kycAddress address to add to KYC registry
   */
  async addKYCAddress(kycAddress, country) {
    const instance = await this.kyc.deployed();
    return instance.addKYCAddress(kycAddress, country, { from: this.account });
  }

  /**
   * Add address list to KYC registry (only admin)
   * @param {string[]} kycAddresses address list to add to KYC registry
   */
  async addKYCAddresses(kycAddresses, country) {
    const instance = await this.kyc.deployed();
    return instance.addKYCAddresses(kycAddresses, country, { from: this.account });
  }

  /**
   * Remove address list to KYC registry (only admin)
   * @param {string[]} kycAddresses address list to remove from KYC registry
   */
  async removeKYCAddress(kycAddress, country) {
    const instance = await this.kyc.deployed();
    return instance.removeKYCAddress(kycAddress, country, { from: this.account });
  }
}
