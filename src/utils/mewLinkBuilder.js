export default function (to, callData, value, network) {
  return 'https://vintage.myetherwallet.com/'
    + `?to=${to}`
    + `&value=${value}`
    + `&data=${callData}`
    + `&network=${network}`
    + '#send-transaction';
}
