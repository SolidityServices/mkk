export default class MewLinkUntility {
  // eslint-disable-next-line class-methods-use-this
  mewLinkBuilder(to, callData, value, network) {
    const url = 'https://www.myetherwallet.com/'
    + `?to=${to}`
    + `&amp;value=${value}`
    + `&amp;data=${callData}`
    + `&amp;network=${network}`
    + '#send-transaction';
    return url;
  }
}
