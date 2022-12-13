import { ethers } from "hardhat";
import * as fs from "fs";

async function deployContract() {
  const EmailDomainVerificationToken = await ethers.getContractFactory(
    "EmailDomainVerificationToken"
  );
  const verificationToken = await EmailDomainVerificationToken.deploy("Attestation Token", "ATK");

  await verificationToken.deployed();
  return verificationToken;
}

async function main() {
  const verificationToken = await deployContract();
  console.log(
    `Verification token contract deployed at: ${(await verificationToken).address
    }`
  );

  let contractAddress = {
    address: verificationToken.address,
  };

  const savedAddressData = JSON.stringify(contractAddress);

  let txn = await verificationToken.setMinterRole("0x3228Bb011473CAF978b9810283777664eB7d8d3b");
  await txn.wait();

  txn = await verificationToken.setAdminRole("0x98323349622ad59bc1425F7bE2Da70C3A9B6dE23");
  await txn.wait();

  fs.writeFileSync("metadata/deployedAddress.json", savedAddressData);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });