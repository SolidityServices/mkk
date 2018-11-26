# Pool creator page

## Inputs

- sale address
  + description: Ethereum address of the token sale contract
  + input field type: text input field
  + desired format for contract: same as input 

- token address (optional)
  + description: Ethereum address of the erc-20 token contract of the sale
  + input field type: text input field
  + desired format for contract: same as input, if left empty: "0x0000000000000000000000000000000000000000"

- creator fee rate
  + description: Fee percentage collected for the pool creator
  + input field type: number input field, percentage value with two decimal accuracy e.g 12.34%, allowed range: 0-100
  + desired format for contract: has to be an integer, has to be multiplied by 100, eg: 1.00% -> 100 , 100.00% -> 10000, 12.34% -> 1234

- sale start date
  + description: Start date of the token sale
  + input field type: date and time input field
  + desired format for contract: unix timestamp with one second resolution e.g: 2018-11-26T20:30:35+00:00 -> 1543264235

- sale end date
  + description: End date of the token sale
  + input field type: date and time input field
  + desired format for contract: unix timestamp with one second resolution e.g: 2018-11-26T20:30:35+00:00 -> 1543264235


- min contribution (optional)
  + description: Minimum contribution amount allowed
  + input field type: Number input field in ether units with any amount of decimals
  + desired format for contract: converted to wei units: https://etherconverter.online/ 1 ether = 1000000000000000000 wei, if not secified, should be 0

- max contribution (optional)
  + description: Maximum contribution amount allowed
  + input field type: Number input field in ether units
  + desired format for contract: converted to wei units: https://etherconverter.online/ 1 ether = 1000000000000000000 wei, if not secified, should be 0

- min pool goal (optional)
  + description: Minimum goal for the pool 
  + input field type: Number input field in ether units
  + desired format for contract: converted to wei units: https://etherconverter.online/ 1 ether = 1000000000000000000 wei, if not secified, should be 0

- max pool allocation
  + description: Maximium amount of funds collectable by the pool
  + input field type: Number input field in ether units
  + desired format for contract: converted to wei units: https://etherconverter.online/ 1 ether = 1000000000000000000 wei

- withdraw timelock (optional)
  + description: The amount of time has to be elapsed between contribution and withdrawal of contribution
  + input field type: time duration input with settable amount of days, hours, seconds
  + desired format for contract: unix timestamp for durations with one second resolution e.g: 01h-01m-01s -> 3661

- whitelist pool
  + description: Will the pool have a whitelist for allowed users
  + input field type: checkbox
  + desired format for contract: boolean

- transfer value
  + description: 
  + input field type: no input field, calculated value: `(PoolFactory.params.flatFee + PoolFactory.params.maxAllocationFee * maxPoolAllocation / 1000)` - connectICO.js: `getFlatFee()`, `getMaxAllocationFeeRate()`
  + desired format for contract: converted to wei units: https://etherconverter.online/ 1 ether = 1000000000000000000 wei

## Function

```
createPool(
    saleAddress,
    tokenAddress,
    creatorFeeRate,
    saleStartDate,
    saleEndDate,
    minContribution,
    maxContribution,
    minPoolGoal,
    maxPoolAllocation,
    withdrawTimelock,
    whitelistPool,
    transferValue,
  )
```

# Pool admin page

# Pool contributor page

# Pool factroy admin page

# KYC admin page

# Token Push Registry admin page

# Pool listing page

# Notes
- pool = deal
- use bignumber.js for conversions https://github.com/MikeMcl/bignumber.js/ same one used by web3.js