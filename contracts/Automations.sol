pragma solidity ^0.4.24;

import '../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol';
import '../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract Automations is Ownable {

    address public pushServer;
    uint public pushGasCost;
    uint public sendToSaleGasCost;

    event newPushOutToken(address indexed pool, address indexed recipient, uint gasPrice);
    event newSendToSale(address indexed pool, uint time, uint gasPrice);
    event completedPushOutToken(address indexed pool, address indexed recipient);
    event completedSendToSale(address indexed pool);


    constructor (address _pushServer, uint _pushGasCost, uint _sendToSaleGasCost) public {
        pushServer = _pushServer;
        pushGasCost = _pushGasCost;
        sendToSaleGasCost = _sendToSaleGasCost;
    }

    function addPushOutToken(address pool, address recipient, uint gasPrice) public payable {
        require(msg.value >= SafeMath.mul(gasPrice, pushGasCost), "addPushOutToken(address orderer, uint gasPrice): Error, message value is less then gas needed");
        pushServer.transfer(SafeMath.mul(gasPrice, pushGasCost));
        emit newPushOutToken(pool, recipient, gasPrice);
    }

    function addSendToSale(address pool, uint time, uint gasPrice) public payable {
        require(msg.value >= SafeMath.mul(gasPrice, sendToSaleGasCost), "addSendToSale(address pool, uint gasPrice, uint time): Error, message value is less then gas needed");
        pushServer.transfer(SafeMath.mul(gasPrice, pushGasCost));
        emit newSendToSale(pool, time, gasPrice);
    }

    function emitPushOutTokenCompleted(address pool, address recipient) public onlyPushServer {
        emit completedPushOutToken(pool, recipient);
    }

    function emitSendToSaleCompleted(address pool) public onlyPushServer {
        emit completedSendToSale(pool);
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
