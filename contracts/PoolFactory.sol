pragma solidity ^0.4.24;

import './Pool.sol';
import './KYC.sol';
import '../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol';
import '../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract PoolFactory is Ownable {

    struct Params {
        address kycContractAddress;
        uint256 flatFee;
        uint16 maxAllocationFeeRate; // 1/1000000
        uint16 maxCreatorFeeRate; // 1/1000
        uint16 providerFeeRate; // 1/1000
        bool useWhitelist;
    }

    Params public params;

    mapping (address => bool) public whitelist;


    //creator whitelist

    event poolCreated(address poolAddress, address indexed poolCreator, address indexed poolSale);
    event whitelistChange(address whitelistAddresses, bool direction);

    constructor (address _kycContractAddress, uint _flatFee, uint16 _maxAllocationFeeRate, uint16 _maxCreatorFeeRate, uint16 _providerFeeRate) public {
        params.kycContractAddress = _kycContractAddress;
        params.flatFee = _flatFee;
        params.maxAllocationFeeRate = _maxAllocationFeeRate;
        params.maxCreatorFeeRate = _maxCreatorFeeRate;
        params.providerFeeRate = _providerFeeRate;
    }

    function createPool(
        address[2] addresses,
        /* address _saleAddress,0
        address _tokenAddress,1 */
        bytes32[3] bytes32s,
        /* bytes32 saleParticipateCalldata,0
        bytes32 _saleWithdrawCalldata,1
        bytes32 _poolDescription,2 */
        uint[8] uints,
        /* uint _creatorFeeRate,0
        uint _saleStartDate,1
        uint _saleEndDate,2
        uint _minContribution,3
        uint _maxContribution,4
        uint _minPoolGoal,5
        uint _maxPoolAllocation,6
        uint _withdrawTimelock,7 */
        bool[2] bools,
        /*bool _whitelistPool,0
        bool _strictlyTrustlessPool,1 */
        address[] adminlist, 
        address[] contributorWhitelist,
        bytes32[] countryBlacklist
    ) public payable {
        require(KYC(params.kycContractAddress).checkKYC(msg.sender), "createPool: tx by not KYC address");
        if (params.useWhitelist) require(whitelist[msg.sender], "createPool: tx by not whitelisted address");
        require(msg.value >= SafeMath.add(params.flatFee, SafeMath.mul(params.maxAllocationFeeRate, uints[6]) / 1000000), "createPool: not enough tx value");
        require(params.maxCreatorFeeRate >= uints[0], "createPool: fee rate > max");
        require(uints[1] <= uints[2], "createPool: saleStartDate > saleEndDate");
        require(uints[3] <= uints[4] || uints[4] == 0, "createPool: minContribution > maxContribution");
        require(uints[5] <= uints[6], "createPool: minPoolGoal > maxPoolAllocation");
        address poolAddress = new Pool(
            [params.kycContractAddress, owner, msg.sender, addresses[0], addresses[1]],
            bytes32s,
            [params.providerFeeRate, uints[0], uints[1], uints[2],
            uints[3], uints[4], uints[5], uints[6],
            uints[7]],
            bools,
            adminlist, 
            contributorWhitelist,
            countryBlacklist
            );
        emit poolCreated(poolAddress, msg.sender, addresses[0]);
    }

    function withdraw() public onlyOwner{
        owner.transfer(address(this).balance);
    }


    function addWhitelist(address[] addressList) public onlyOwner {
        for(uint i = 0; i < addressList.length; i++) {
          require(KYC(params.kycContractAddress).checkKYC(addressList[i]), "addWhitelist: not KYC address");
          whitelist[addressList[i]] = true;
          emit whitelistChange(addressList[i], true);
        }
    }

    function removeWhitelist(address[] addressList) public onlyOwner {
      for(uint i = 0; i < addressList.length; i++) {
        whitelist[addressList[i]] = false;
        emit whitelistChange(addressList[i], false);
      }
    }

    function setParams(
        address _owner,
        address _kycContractAddress,
        uint256 _flatFee,
        uint16 _maxAllocationFeeRate, // 1/1000000
        uint16 _maxCreatorFeeRate, // 1/1000
        uint16 _providerFeeRate, // 1/1000
        bool _useWhitelist,
        bool[7] toSet
        ) public onlyOwner {
            if(toSet[0]){
                owner = _owner;
            }
            if(toSet[1]){
                params.kycContractAddress = _kycContractAddress;
            }
            if(toSet[2]){
                params.flatFee = _flatFee;
            }
            if(toSet[3]){
                params.maxAllocationFeeRate = _maxAllocationFeeRate;
            }
            if(toSet[4]){
                params.maxCreatorFeeRate = _maxCreatorFeeRate;
            }
            if(toSet[5]){
                params.providerFeeRate = _providerFeeRate;
            }
            if(toSet[6]){
                params.useWhitelist = _useWhitelist;
            }

    }

    function () public payable {
        revert("fallback function");
    }

}
