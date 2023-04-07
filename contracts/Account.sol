// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "./UserOperation.sol";

contract Account {
    function handleOps(UserOperation calldata userOp) external {
        require(userOp.value <= address(this).balance, "Requiring more funds to be transferred");

        (bool success, bytes memory data) = payable(userOp.contractAddress).call{value: userOp.value}(userOp.callData);
        require(success, "The transaction failed");
    }

    function payGas(uint256 amount) external {
        (bool success, bytes memory data) = payable(msg.sender).call{value: amount}("");
    }

    receive() external payable {}
}