import { requestAccount, getContract } from "./common";

async function mintVerificationNFT(contractAddr, artifact, emailDomain, ethereumAddress, signature) {
    if (typeof window.ethereum != undefined) {
        await requestAccount();
        
        const nftContract = getContract(contractAddr, artifact);
        try {
            console.log(`Email Domain: ${emailDomain}`);
            console.log(`Ethereum Address: ${ethereumAddress}`);
            console.log(`Signature: ${signature}`);

            let transaction = await nftContract.redeem(ethereumAddress, emailDomain, signature);

            let receipt = await transaction.wait();
            console.log(receipt);
        }
        catch (err) {
            console.log(err);
        }
    }
}

export { mintVerificationNFT }