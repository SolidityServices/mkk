import TruffleContract from 'truffle-contract';
import detailedERC20Artifact from '../../../build/contracts/DetailedERC20.json';

export default class KYC {
  constructor(provider, account, web3) {
    this.kyc = TruffleContract(detailedERC20Artifact);
    this.kyc.setProvider(provider);
    this.account = account;
    this.web3 = web3;
  }

  async getSymbol(tokenAddress) {
    const instance = await this.pool.at(tokenAddress);
    return instance.symbol.call({ from: this.account });
  }

  async getName(tokenAddress) {
    const instance = await this.pool.at(tokenAddress);
    return instance.name.call({ from: this.account });
  }
}
