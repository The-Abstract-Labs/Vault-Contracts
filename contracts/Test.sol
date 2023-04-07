// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Test {
    function test(string calldata message) public {
        console.log(message);
    }
}