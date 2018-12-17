import TruffleContract from 'truffle-contract';
import tokenPushRegistryArtifact from '../../../build/contracts/TokenPushRegistry.json';

export default class TokenPushRegistry {
  constructor(provider) {
    this.tokenPushRegistry = TruffleContract(tokenPushRegistryArtifact);
    this.tokenPushRegistry.setProvider(provider);
  }

  async getAddress() {
    const instance = await this.tokenPushRegistry.deployed();
    return instance.address;
  }
}
