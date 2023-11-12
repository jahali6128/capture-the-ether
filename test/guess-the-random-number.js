const { expect } = require("chai");
const { id, solidityPackedKeccak256 } = require("ethers");


describe("Guess the Random Number", function() {

    it("Contract should have a balance of 0", async function () {
        const [owner] = await ethers.getSigners();

        send_ether = { value: ethers.parseUnits("1", "ether") };
        const contract = await ethers.deployContract("GuessTheRandomNumberChallenge", send_ether);

        // ---------------------Write our solution here -----------------------
       
        // Retrieve the current block number
        const block_number = await network.provider.send("eth_blockNumber");
        // previous output in hex - convert to int -> subtract 1 -> append "0x"  
        const prev_block_num = "0x" + (parseInt(block_number, 16) - 1).toString(16);

        // Retrieve block details for previous block
        const block_prev = await network.provider.send("eth_getBlockByNumber", [prev_block_num, false]); 

        // Output already in JSON so easily callable
        const block_hash = block_prev.hash;

        // Get timestamp for the current block
        const block_latest = await network.provider.send("eth_getBlockByNumber", ["latest", false]); 
        const block_timestamp = parseInt(block_latest.timestamp, 16);

        // const hash = id(block_hash + block_timestamp);
        const hash = solidityPackedKeccak256([ "bytes32", "uint" ], [ block_hash, block_timestamp ]);

        // Answer is 8 bit so last 2 hex characters are needed
        const answer = parseInt(hash.slice(-2), 16);

        console.log("Answer:", answer);
        await contract.guess(answer, send_ether);

        // --------------Check if challenge is completed -------------------------

        const isComplete = await contract.isComplete();
        expect(isComplete).to.equal(true);

    });

});