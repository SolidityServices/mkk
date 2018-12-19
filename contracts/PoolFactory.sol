pragma solidity ^0.4.24;

import './Pool.sol';
import './KYC.sol';
import '../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol';
import '../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract PoolFactory is Ownable {

    struct Params {
        address kycContractAddress;
        uint256 flatFee;
        uint16 maxAllocationFeeRate; // 1/1000
        uint16 maxCreatorFeeRate; // 1/1000
        uint16 providerFeeRate; // 1/1000
        bool useWhitelist;
    }

    Params public params;

    address[] public poolList;
    mapping (address => bool) public pools;
    mapping (address => address[]) private poolsBySale;
    mapping (address => address[]) private poolsByCreator;
    mapping (address => bool) public whitelist;


    //creator whitelist

    event poolCreated(address poolAddress);
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
        /* bytes32 _saleParticipateFunctionSig,0
        bytes32 _saleWithdrawFunctionSig,1
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
        bool _whitelistPool,
        address[] adminlist, 
        address[] contributorWhitelist,
        bytes32[] countryBlacklist
    ) public payable {
        require(KYC(params.kycContractAddress).checkKYC(msg.sender), "createPool(...): Error, tx was not initiated by KYC address");
        if (params.useWhitelist) require(whitelist[msg.sender], "createPool(...): Error, tx was not initiated by whitelisted address");
        require(msg.value >= SafeMath.add(params.flatFee, SafeMath.mul(params.maxAllocationFeeRate, uints[6]) / 1000), "createPool(...): Error, not enough value for fees");
        require(params.maxCreatorFeeRate >= uints[0], "createPool(...): Error, pool fee rate is greater than max allowed");
        address poolAddress = new Pool(
            [params.kycContractAddress, owner, msg.sender, addresses[0], addresses[1]],
            [bytes32s[0], bytes32s[1], bytes32s[2]],
            [params.providerFeeRate, uints[0], uints[1], uints[2],
            uints[3], uints[4], uints[5], uints[6],
            uints[7]],
            _whitelistPool,
            adminlist, 
            contributorWhitelist,
            countryBlacklist
            );
        poolList.push(poolAddress);
        poolsBySale[addresses[0]].push(poolAddress);
        poolsByCreator[msg.sender].push(poolAddress);
        pools[poolAddress] = true;
        emit poolCreated(poolAddress);
    }

    function wtihdraw() public onlyOwner{
        owner.transfer(address(this).balance);
    }


    function addWhitelist(address[] addressList) public onlyOwner {
        for(uint i = 0; i < addressList.length; i++) {
          require(KYC(params.kycContractAddress).checkKYC(addressList[i]), "addWhitelist(address[] addressList): Error, address is not a KYC address");
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
        uint16 _maxAllocationFeeRate, // 1/1000
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
        revert("Error: fallback function");
    }

    function getPoolNumber() public view returns (uint){
        return poolList.length;
    }

    function getPoolNumberBySale(address saleAddress) public view returns (uint){
        return poolsBySale[saleAddress].length;
    }

    function getPoolBySale(address saleAddress, uint index) public view returns (address){
        return poolsBySale[saleAddress][index];
    }

    function getPoolNumberByCreator(address creatorAddress) public view returns (uint){
        return poolsByCreator[creatorAddress].length;
    }

    function getPoolByCreator(address creatorAddress, uint index) public view returns (address){
        return poolsByCreator[creatorAddress][index];
    }

}
