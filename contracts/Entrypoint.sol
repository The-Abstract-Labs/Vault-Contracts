// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "./Account.sol";
import "./UserOperation.sol";

contract Entrypoint {
    function handleOps(UserOperation calldata userOp) public {
        uint256 startingGas = gasleft();
        Account wallet = Account(payable(userOp.sender));
        wallet.handleOps(userOp);

        uint256 leftGas = gasleft();
        uint256 actualGas = startingGas - leftGas;
        wallet.payGas(actualGas);

        console.log(actualGas);

        payable(msg.sender).call{value: actualGas}("");
    }

    receive() external payable {}
}