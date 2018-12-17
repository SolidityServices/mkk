pragma solidity ^0.4.24;

import '../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol';
import '../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract TokenPushRegistry is Ownable {

    address public pushServer;
    uint public pushGasCost;
    mapping(address => mapping(address => uint)) public pushGasPrice; //(poolAddress => (recipientAddress => gasPrice))
    mapping(address => address[]) public recipients;

    constructor (address _pushServer, uint _pushGasCost) public {
        pushServer = _pushServer;
        pushGasCost = _pushGasCost;
    }

    function add(address pool, uint gasPrice) public payable {
        require(msg.value >= SafeMath.mul(gasPrice, pushGasCost), "add(address pool, uint gasPrice): Error, message value is less then gas needed");
        pushGasPrice[pool][msg.sender] = gasPrice;
        recipients[pool].push(msg.sender);
    }

    function takeGas(address pool, address recipient) public onlyPushServer {
        pushServer.transfer(SafeMath.mul(pushGasPrice[pool][recipient], pushGasCost));
        pushGasPrice[pool][recipient] = 0;
    }

    function setPushServer(address _pushServer) public onlyOwner {
        pushServer = _pushServer;
    }

    function setPushGasCost(uint _pushGasCost) public onlyOwner {
        pushGasCost = _pushGasCost;
    }

    modifier onlyPushServer{
        require(msg.sender == pushServer, "onlyPushServer onlyOwner: Error, tx was not initiated by owner push server");
        _;
    }

}
