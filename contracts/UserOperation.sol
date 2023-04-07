// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

struct UserOperation {
    address sender;
    address contractAddress;
    uint256 nonce;
    uint256 value;
    bytes callData;
    bytes signature;
}