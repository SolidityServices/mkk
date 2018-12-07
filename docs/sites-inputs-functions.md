# Pool factroy public info page 

(can be just a section in Pool creator page)

## To display

- Contract owner address
  + description:
  + format in contract: address type
  + display format: sting
  + function: getPoolFactoryOwner()

- KYC contract address
  + description:
  + format in contract: address type
  + display format: sting
  + function: getPoolFactoryKycContractAddress()

- Flat fee
  + description: Fix fee paid by the creator to the service provider for creating a new pool
  + format in contract: wei
  + display format: ether - https://etherconverter.online/ 1 ether = 1000000000000000000 wei, if not specified, should be 0
  + function: getFlatFee()

- Max allocation fee
  + description: Fee paid by the creator to the service provider for the maximum allocation `(PoolFactory.params.maxAllocationFee * maxPoolAllocation / 1000)`
  + format in contract: integer from 0-10000 
  + display format: percentage valu with 2 decimals accuracy, original contract value has to be divided by 100: 0 -> 0.00%, 1234 -> 12.34%, 10000 -> 100.00%
  + function: getMaxAllocationFeeRate()

- Max creator fee
  + description: Maximum allowed fee settable by the pool creator
  + format in contract: integer from 0-10000 
  + display format: percentage valu with 2 decimals accuracy, original contract value has to be divided by 100: 0 -> 0.00%, 1234 -> 12.34%, 10000 -> 100.00%
  + function: getMaxCreatorFeeRate()

- Provider fee rate
  + description: Amount of fee, the service provider receives from each pool contribution
  + format in contract: integer from 0-10000 
  + display format: percentage valu with 2 decimals accuracy, original contract value has to be divided by 100: 0 -> 0.00%, 1234 -> 12.34%, 10000 -> 100.00%
  + function: getProviderFeeRate()




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
  + desired format for contract: converted to wei units: https://etherconverter.online/ 1 ether = 1000000000000000000 wei, if not specified, should be 0

- max contribution (optional)
  + description: Maximum contribution amount allowed
  + input field type: Number input field in ether units
  + desired format for contract: converted to wei units: https://etherconverter.online/ 1 ether = 1000000000000000000 wei, if not specified, should be 0

- min pool goal (optional)
  + description: Minimum goal for the pool 
  + input field type: Number input field in ether units
  + desired format for contract: converted to wei units: https://etherconverter.online/ 1 ether = 1000000000000000000 wei, if not specified, should be 0

- max pool allocation
  + description: Maximium amount of funds collectable by the pool
  + input field type: Number input field in ether units
  + desired format for contract: converted to wei units: https://etherconverter.online/ 1 ether = 1000000000000000000 wei

- withdraw timelock (optional)
  + description: The amount of time has to be elapsed between contribution and withdrawal of contribution
  + input field type: time duration input with settable amount of days, hours, seconds
  + desired format for contract: unix timestamp for durations with one second resolution e.g: 01h-01m-01s -> 3661

- is whitelist pool
  + description: Will the pool have a whitelist for allowed users
  + input field type: checkbox (or similar)
  + desired format for contract: boolean

- transfer value
  + description: Amount of ether creator needs to send
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

All functions on this page will need the poolAddress, before arriving to this page, the user needs to select a pool from the list

## Inputs

### Manage parameters

- update creator address
  + description: Address of the pool creator
  + input field type: text input field
  + desired format for contract: same as input 
  + function: `setCreator(poolAddress, creatorAddress)`

- update creator fee rate
  + description: Fee percentage collected for the pool creator
  + input field type: number input field, percentage value with two decimal accuracy e.g 12.34%, allowed range: 0-100
  + desired format for contract: has to be an integer, has to be multiplied by 100, eg: 1.00% -> 100 , 100.00% -> 10000, 12.34% -> 1234
  + function: `setCreatorFeeRate(poolAddress, creatorFeeRate)`

- update sale start date
  + description: Start date of the token sale
  + input field type: date and time input field
  + desired format for contract: unix timestamp with one second resolution e.g: 2018-11-26T20:30:35+00:00 -> 1543264235
  + function: `setSaleStartDate(poolAddress, saleStartDate)`

- update sale end date
  + description: End date of the token sale
  + input field type: date and time input field
  + desired format for contract: unix timestamp with one second resolution e.g: 2018-11-26T20:30:35+00:00 -> 1543264235
  + function: `setSaleEndDate(poolAddress, saleEndDate)`

- update withdraw timelock
  + description: The amount of time has to be elapsed between contribution and withdrawal of contribution
  + input field type: time duration input with settable amount of days, hours, seconds
  + desired format for contract: unix timestamp for durations with one second resolution e.g: 01h-01m-01s -> 3661
  + function: `setWithdrawTimelock(poolAddress, withdrawTimelock)`

- update min contribution
  + description: Minimum contribution amount allowed
  + input field type: Number input field in ether units with decimals
  + desired format for contract: converted to wei units: https://etherconverter.online/ 1 ether = 1000000000000000000 wei
  + function: `setMinContribution(poolAddress, minContribution)`

- update max contribution
  + description: Maximum contribution amount allowed
  + input field type: Number input field in ether units with decimals
  + desired format for contract: converted to wei units: https://etherconverter.online/ 1 ether = 1000000000000000000 wei
  + function: `setMaxContribution(poolAddress, maxContribution)`

- update min pool goal
  + description: Minimum goal for the pool 
  + input field type: Number input field in ether units
  + desired format for contract: converted to wei units: https://etherconverter.online/ 1 ether = 1000000000000000000 wei
  + function: `setMinPoolGoal(poolAddress, minPoolGoal)`

- update whitelist pool
  + description: Will the pool have a whitelist for allowed users
  + input field type: checkbox (or similar)
  + desired format for contract: boolean
  + function: `setWhitelistPool(poolAddress, isWhitelistPool)`

- update token address
  + description: Ethereum address of the erc-20 token contract of the sale
  + input field type: text input field
  + desired format for contract: same as input
  + function: `setTokenAddress(poolAddress, tokenAddress)`

#### Function for all params

`setPoolParamsCreator()`

### Manage whitelist

- add whitelist address
  + input field type: text input field
  + desired format for contract: same as input
  + function: `addWhitelist(poolAddress, whitelistAddress)`

- remove whitelist address
  + input field type: text input field
  + desired format for contract: same as input
  + function: `removeWhitelist(poolAddress, whitelistAddress)`

### Pool operations

- send funds to sale
  + description:
  + function: `sendToSale(poolAddress)`

- send to sale function
  + description: send to sale using pre determined function signature (only possible if function signature is presented, not yet implemented)
  + input field type: none 
  + desired format for contract: none
  + function: not yet implemented
  
- confirm tokens received
  + description: confirmation for tokens received from the sale
  + input field type: number - number of tokens expected in eth unit, with decimals
  + desired format for contract: converted to wei units: https://etherconverter.online/ 1 ether = 1000000000000000000 wei
  + function: `areTokensReceivedConfirmed(poolAddress)`
  
- withdraw from sale function
  + description: withdraw from sale using pre determined function signature (only possible if function signature is presented, not yet implemented)
  + input field type: none 
  + desired format for contract: none
  + function: not yet implemented
  
- creator withdraw
  + description: Withdrawal of accumulated fees in the pool
  + input field type: none 
  + desired format for contract: none
  + function: `creatorWithdraw(poolAddress)`
  
- push out token
  + description: Push out received sale tokens to the pool contributor
  + input field type: contributor address
  + desired format for contract: address (same)
  + function: `pushOutToken(poolAddress, recipientAddress)`
  

# Pool info page
(can be just a section in Pool admin and Pool Contributor page)

All functions on this page will need the poolAddress, before arriving to this page, the user needs to select a pool from the list

## To display

- pool contract address
  + description: address of the pool
  + format in contract: address type
  + display format: sting
  + function: needs to be known at this point, can be queried from poolFactory: `getPool(index)`

- pool balance
  + description: eth balance of the pool
  + format in contract: wei
  + display format: ether - https://etherconverter.online/ 1 ether = 1000000000000000000 wei
  + function: `getPoolBalance(poolAddress)`

- allGrossContributions
  + description: all contributions received by the pool
  + format in contract: wei
  + display format: ether - https://etherconverter.online/ 1 ether = 1000000000000000000 wei
  + function: `getAllGrossContributions(poolAddress)`

- creator address
  + description:
  + format in contract: address type
  + display format: sting
  + function: `getCreatorAddress(poolAddress)`

- provider address 
  + description: 
  + format in contract: address type
  + display format: sting
  + function: `getProviderAddress(poolAddress)`

- creatorStash
  + description: accumulated fees for the pool creator
  + format in contract: wei
  + display format: ether - https://etherconverter.online/ 1 ether = 1000000000000000000 wei
  + function: `getCreatorStash(poolAddress)`

- providerStash
  + description: accumulated fees for the pool provider
  + format in contract: wei
  + display format: ether - https://etherconverter.online/ 1 ether = 1000000000000000000 wei
  + function: `getProviderStash(poolAddress)`

- sentToSale
  + description: if funds have been sent from the pool to the sale
  + display format: boolean
  + format in contract: boolean 
  + function: `isSentToSale(poolAddress)`

- tokensReceivedConfirmed
  + description: if sale tokens have been received from the sale to the pool
  + display format: boolean
  + format in contract: boolean
  + function: `areTokensReceivedConfirmed(poolAddress)`

- sale address
  + description: Ethereum address of the token sale contract
  + format in contract: address type
  + display format: sting
  + function: `getSaleAddress(poolAddress)`

- token address
  + description: Ethereum address of the erc-20 token contract of the sale
  + format in contract: address type
  + display format: sting
  + function: `getTokenAddress(poolAddress)`

- creator fee rate
  + description: Fee percentage collected for the pool creator
  + display format: number input field, percentage value with two decimal accuracy e.g 12.34%, allowed range: 0-100
  + format in contract: has to be an integer, has to be multiplied by 100, eg: 1.00% -> 100 , 100.00% -> 10000, 12.34% -> 1234
  + function: `getCreatorFeeRate(poolAddress)`
  
- provider fee rate
  + description: Fee percentage collected for the provider
  + display format: number input field, percentage value with two decimal accuracy e.g 12.34%, allowed range: 0-100
  + format in contract: has to be an integer, has to be multiplied by 100, eg: 1.00% -> 100 , 100.00% -> 10000, 12.34% -> 1234
  + function: `getProviderFeeRate(poolAddress)`

- sale start date
  + description: Start date of the token sale
  + display format: date and time input field
  + format in contract: unix timestamp with one second resolution e.g: 2018-11-26T20:30:35+00:00 -> 1543264235
  + function: `getStartDate(poolAddress)`

- sale end date
  + description: End date of the token sale
  + display format: date and time input field
  + format in contract: unix timestamp with one second resolution e.g: 2018-11-26T20:30:35+00:00 -> 1543264235
  + function: `getEndDate(poolAddress)`

- min contribution 
  + description: Minimum contribution amount allowed
  + format in contract: wei
  + display format: ether - https://etherconverter.online/ 1 ether = 1000000000000000000 wei
  + function: `getMinContribution(poolAddress)`

- max contribution 
  + description: Maximum contribution amount allowed
  + format in contract: wei
  + display format: ether - https://etherconverter.online/ 1 ether = 1000000000000000000 wei
  + function: `getMaxContribution(poolAddress)`

- min pool goal 
  + description: Minimum goal for the pool 
  + format in contract: wei
  + display format: ether - https://etherconverter.online/ 1 ether = 1000000000000000000 wei
  + function: `getMinPoolGoal(poolAddress)`

- max pool allocation
  + description: Maximium amount of funds collectable by the pool
  + format in contract: wei
  + display format: ether - https://etherconverter.online/ 1 ether = 1000000000000000000 wei
  + function: `getMaxPoolAllocation(poolAddress)`

- withdraw timelock (optional)
  + description: The amount of time has to be elapsed between contribution and withdrawal of contribution
  + display format: time duration input with settable amount of days, hours, seconds
  + format in contract: unix timestamp for durations with one second resolution e.g: 01h-01m-01s -> 3661
  + function: `getWithdrawTimelock(poolAddress)`

- is whitelist pool
  + description: Will the pool have a whitelist for allowed users
  + display format: boolean
  + format in contract: boolean
  + function: `isWhitelistPool(poolAddress)`

  ### Batch functions
  
  - `getAllPoolStats(poolAddress)`
  - `getPoolParams(poolAddress)`

# Pool contributor page

All functions on this page will need the poolAddress, before arriving to this page, the user needs to select a pool from the list

TO DO

# Pool factory admin page 

(page for only insiders, no need for fancy design)

TO DO

# Pool provider admin page 

All functions on this page will need the poolAddress, before arriving to this page, the user needs to select a pool from the list

(page for only insiders, no need for fancy design)

TO DO

# KYC admin page 

(page for only insiders, no need for fancy design)

TO DO

# Token Push Registry admin page 

(page for only insiders, no need for fancy design)

TO DO

# Pool listing page 

(just a simple page to select pools, no need for MKK design)

TO DO

# Notes
- pool = deal
- use bignumber.js for conversions https://github.com/MikeMcl/bignumber.js/ same one used by web3.js