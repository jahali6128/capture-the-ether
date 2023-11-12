const { expect } = require("chai");
// const { setBalance } = require("@nomicfoundation/hardhat-network-helpers");

describe("Guess the Number", function() {

    it("Contract should have a balance of 0", async function() {
        const [owner] = await ethers.getSigners();
        
        // We need to send 1 ether as stated in the contract
        send_ether = { value: ethers.parseUnits("1", "ether") };

        const contract = await ethers.deployContract("GuessTheNumberChallenge", send_ether);
        // const contract_address = await contract.getAddress();
        // Smart contract will need 2 ether
        // await setBalance(contract_address, 2n * (10n ** 18n));

        // Write our solution here
        const answer = 42;
        await contract.guess(answer, send_ether);

        // Check if challenge is completed
        const isComplete = await contract.isComplete();
        expect(isComplete).to.equal(true);
        
    });
});




