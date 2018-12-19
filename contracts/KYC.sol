pragma solidity ^0.4.24;

import '../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol';
//import {stringUtils} from './utils/stringUtils.sol';

contract KYC is Ownable {
    mapping(address => bool) public admins;
    mapping(address => bytes32) public kycCountry;

    event adminsChange(address adminAddress, bool direction);
    event kycChange(address kycAddress, bytes32 country, bool direction);


    constructor () public {
        admins[owner] = true;
        addKYCAddress(owner, "hun");
    }

    function addAdmin(address[] addressList) public onlyOwner {
        for(uint i = 0; i < addressList.length; i++) {
            admins[addressList[i]] = true;
            emit adminsChange(addressList[i], true);
        }
    }

    function removeAdmin(address[] addressList) public onlyOwner {
      for(uint i = 0; i < addressList.length; i++) {
          admins[addressList[i]] = false;
          emit adminsChange(addressList[i], false);
      }
    }

    function addKYCAddress(address kycAddress, bytes32 country) public onlyAdmin {
        kycCountry[kycAddress] = country;
        emit kycChange(kycAddress, country, true);
    }

    function addKYCAddress(address[] addressList, bytes32[] countryList) public onlyAdmin {
        require(addressList.length == countryList.length,  "addKYCAddress(address[] addressList, bytes3[] countryList): Error, addressList and countryList has different lenghts");
        for(uint i = 0; i < addressList.length; i++){
            kycCountry[addressList[i]] = countryList[i];
            emit kycChange(addressList[i], countryList[i], true);
        }
    }

    function removeKYCAddress(address[] addressList) public onlyAdmin {
      for(uint i = 0; i < addressList.length; i++){
          delete kycCountry[addressList[i]];
        emit kycChange(addressList[i], 0x0, false);
      }
    }

    //This function is not really necessary, since you already declared kycAddresses mapping as public
    function checkKYC(address addr) public view returns (bool) {
        return (kycCountry[addr] != 0x0);
    }

    modifier onlyAdmin {
        require(admins[msg.sender], "modifier onlyAdmin: Error, tx was not initiated by admin address");
        _;
    }
}
