import * as dotenv from "dotenv";

import "@nomiclabs/hardhat-etherscan";

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.17",

  networks: {
    hardhat: {
      chainId: 1337,
    },
    goerli: {
      url: process.env.GOERLI_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    }
  },

  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || "",
  }
};

export default config;
