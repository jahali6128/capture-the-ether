const { expect } = require("chai");


describe("Guess the Secret Number", function() {

    it("Contract should have a balance of 0", async function () {
        const [owner] = await ethers.getSigners();

        send_ether = { value: ethers.parseUnits("1", "ether") };
        const contract = await ethers.deployContract("GuessTheSecretNumberChallenge", send_ether);

        // Write our solution here
        const answer_hash = "0xdb81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365";
        let answer = 0;

        // Hacky way of converting integers to bytes
        for (let i=0; i<255; i++) {
            let hash = ""

            if (i<16) {
                hash = ethers.keccak256("0x0" + i.toString(16));
                
                if (hash === answer_hash) {
                    answer = i;
                };
            }

            else {
                hash = ethers.keccak256("0x" + i.toString(16));
                
                if (hash === answer_hash) {
                    answer = i;
                };
            };
        };

        console.log("Answer:", answer);
        await contract.guess(answer, send_ether);

        // Check if challenge is completed
        const isComplete = await contract.isComplete();
        expect(isComplete).to.equal(true);

    });

});