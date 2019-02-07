export default function (to, callData, value, network) {
  return 'https://www.myetherwallet.com/'
    + `?to=${to}`
    + `&amp;value=${value}`
    + `&amp;data=${callData}`
    + `&amp;network=${network}`
    + '#send-transaction';
}
