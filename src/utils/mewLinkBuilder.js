export default function (to, callData, value, network) {
  return 'https://vintage.myetherwallet.com/'
    + `?to=${to}`
    + `&value=${value}`
    + `&data=${callData}`
    + `&network=${network}`
    // TODO: remove it or change if be able to fetch dinamically
    + '&gaslimit=3900000'
    + '#send-transaction';
}
