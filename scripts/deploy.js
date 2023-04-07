// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const Entrypoint = await hre.ethers.getContractFactory("Entrypoint");
  const Account = await hre.ethers.getContractFactory("Account");
  const Test = await hre.ethers.getContractFactory("Test");
  const NFT = await hre.ethers.getContractFactory("NFT");

  const entrypoint = await Entrypoint.deploy();
  const account = await Account.deploy();
  const test = await Test.deploy();
  const nft = await NFT.deploy();

  await entrypoint.deployed();
  await account.deployed();
  await test.deployed();
  await nft.deployed();

  const [owner] = await hre.ethers.getSigners();
  let tx = await owner.sendTransaction({
    to: account.address,
    value: hre.ethers.utils.parseEther('0.1'),
    gasLimit: 1000000
  });

  await tx.wait();

  // console.log(await hre.ethers.provider.getBalance(account.address))
  // console.log(test.interface.encodeFunctionData('test', ['hello world!!!']))

  tx = await entrypoint.handleOps({
    sender: account.address,
    contractAddress: nft.address,
    nonce: 0,
    value: 0,
    callData: nft.interface.encodeFunctionData('mint', [account.address]),
    signature: []
  });
  await tx.wait();

  
  tx = await entrypoint.handleOps({
    sender: account.address,
    contractAddress: nft.address,
    nonce: 0,
    value: 0,
    callData: nft.interface.encodeFunctionData('mint', [account.address]),
    signature: []
  });
  await tx.wait();

  console.log(await nft.balanceOf(account.address))
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
