const { mine } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

async function main() {
  const [deployer] = await ethers.getSigners();

  //console.log("Deploying contracts with the account:", deployer.address);

 // const token = await ethers.deployContract("PredictTheBlockHashChallenge");
  //console.log("Token address:", await token.getAddress());
  await mine(1000);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
