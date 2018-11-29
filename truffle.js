module.exports = {
  networks: {
    dev: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // Match any network id
      gas: 8000000,
    },
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
};
