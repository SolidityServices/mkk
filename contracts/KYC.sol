pragma solidity ^0.4.24;

import '../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol';
import {stringUtils} from './utils/stringUtils.sol';

contract KYC is Ownable {
    mapping(address => bool) public admins;
    mapping(address => bool) public kycAddresses;
    mapping(address => bytes32) public kycCountry;

    constructor () public {
        admins[owner] = true;
    }

    function addAdmin(address[] addressList) public onlyOwner {
        for(uint i = 0; i < addressList.length; i++) {
            admins[addressList[i]] = true;
        }
    }

    function removeAdmin(address[] addressList) public onlyOwner {
      for(uint i = 0; i < addressList.length; i++) {
          admins[addressList[i]] = false;
      }
    }

    function addKYCAddress(address[] addressList, bytes32[] countryList) public onlyAdmin {
        require(addressList.length == countryList.length,  "addKYCAddress(address[] addressList, bytes3[] countryList): Error, addressList and countryList has different lenghts");
        for(uint i = 0; i < addressList.length; i++){
            kycAddresses[addressList[i]] = true;
            kycCountry[addressList[i]] = countryList[i];

        }
    }

    function removeKYCAddress(address[] addresList) public onlyAdmin {
      for(uint i = 0; i < addressList.length; i++){
          kycAddresses[addressList[i]] = false;
          delete kycCountry[addressList[i]];
      }
    }

    //This function is not really necessary, since you already declared kycAddresses mapping as public
    function checkKYC(address addr) public view returns (bool) {
        return kycAddresses[addr];
    }

    modifier onlyAdmin {
        require(admins[msg.sender], "modifier onlyAdmin: Error, tx was not initiated by admin address");
        _;
    }
}
