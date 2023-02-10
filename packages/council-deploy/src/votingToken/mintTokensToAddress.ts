import { MockERC20, MockERC20__factory } from "@council/typechain";
import hre from "hardhat";
import { Wallet } from "ethers";
import { parseUnits } from "ethers/lib/utils";

const provider = hre.ethers.provider;
const goerliKey = process.env.GOERLI_DEPLOYER_PRIVATE_KEY;
const signer = new Wallet(goerliKey as string, provider);
const votingTokenContract = MockERC20__factory.connect(
  "0x8e985C9c7727d7c6f16c5Fe57e9336368D66E801",
  signer,
);

/**
 * Mints tokens to the recipient. The amount to mint is given via an interactive
 * prompt.
 */
export async function mintTokensToAddresses(
  tokenContract: MockERC20,
  amountToMint: string,
  recipientAddresses: string[],
): Promise<void> {
  const tokenDecimals = await tokenContract.decimals();

  const txs = [];
  console.log(
    `minting ${amountToMint} tokens each to ${recipientAddresses.length} addresses`,
  );
  let counter = 1;
  for (const recipientAddress of recipientAddresses) {
    console.log("recipientAddress", recipientAddress);
    const tx = await tokenContract.mint(
      recipientAddress,
      parseUnits(amountToMint as string, tokenDecimals),
    );
    console.log(`${counter} Mint submitted, waiting 1 confirmation...`);
    await tx.wait();
    txs.push(tx);
    counter++;
  }
}

mintTokensToAddresses(votingTokenContract, "100", [
  "0x020A6F562884395A7dA2be0b607Bf824546699e2",
  "0x020a898437E9c9DCdF3c2ffdDB94E759C0DAdFB6",
  "0x005182C62DA59Ff202D53d6E42Cef6585eBF9617",
  "0x01067d852EEf5d7677686Ce8280DC3c8B4C007Fa",
  "0x004dfC2dBA6573fa4dFb1E86e3723e1070C0CfdE",
  "0x005BB73FddB8CE049eE366b50d2f48763E9Dc0De",
  "0x02147558D39cE51e19de3A2E1e5b7c8ff2778829",
  "0x00905A77Dc202e618d15d1a04Bc340820F99d7C4",
  "0x0065291E64E40FF740aE833BE2F68F536A742b70",
  "0x020b42c1E3665d14275E2823bCef737015c7f787",
  "0x0076b154e60BF0E9088FcebAAbd4A778deC5ce2c",
  "0x020d6145B890A57f02AB178eca7C7fE34f0A4e41",
  "0x00860d89A40a5B4835a3d498fC1052De04996de6",
  "0x009ef846DcbaA903464635B0dF2574CBEE66caDd",
  "0x00C766b7DBB64E946Bf720f5220E5bF4ea2adc83",
  "0x00D5E029aFCE62738fa01EdCA21c9A4bAeabd434",
  "0x00f318fb06A05cB0F1FB20d1e3e688f166c04610",
  "0x0101c009CD4df4492D3E0DDCEAb0997dEeEe7dEf",
])
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
