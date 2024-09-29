// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CropToken is ERC20 {
    address public farmer;

    constructor(uint initialSupply) ERC20("CropToken", "CROP") {
        farmer = msg.sender;
        _mint(farmer, initialSupply);
    }

    function transferTokens(address recipient, uint256 amount) public {
        require(msg.sender == farmer, "Only the farmer can transfer tokens");
        _transfer(farmer, recipient, amount);
    }
}