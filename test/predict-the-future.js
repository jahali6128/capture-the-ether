const { expect } = require("chai");
const { mine } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { keccak256 } = require("ethers");

describe("Predict the Future", () => {

    it("Contract should have a balance of 0", async function() {
        const [owner] = await ethers.getSigners();
        
        // We need to send 1 ether as stated in the contract
        send_ether = { value: ethers.parseUnits("1", "ether") };
        const contract = await ethers.deployContract("PredictTheFutureChallenge", send_ether);

        // Write our solution here
        const hash = keccak256("0x" + "0".repeat(64));
        const answer = parseInt(hash.slice(-2), 16);

        await contract.lockInGuess(answer, send_ether);

	    await contract.settle();
	
        // Check if challenge is completed
        const isComplete = await contract.isComplete();
        expect(isComplete).to.equal(true);
        
    });
});




