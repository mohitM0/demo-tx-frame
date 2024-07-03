import {
  Abi,
  createPublicClient,
  encodeFunctionData,
  formatUnits,
  getContract,
  http,
  parseUnits,
} from "viem";
import { optimism } from "viem/chains";
import { frames } from "../index";
import { erc20Abi } from "./contracts/erc20-abi";
import { transaction } from "frames.js/core";

export const POST = frames(async (ctx) => {
  if (!ctx?.message) {
    throw new Error("Invalid frame message");
  }

  const address =
    ctx.message.verifiedWalletAddress || ctx.message.connectedAddress;

  // Get current storage price
  const units = BigInt(parseUnits("1", 6));

  // Transfering 1 USDC to yourself
  const calldata = encodeFunctionData({
    abi: erc20Abi,
    functionName: "transfer",
    args: [address as `0x${string}`, units] as const,
  });

  const BASE_USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";

  return transaction({
    chainId: "eip155:8453", // Base Mainnet 8453
    method: "eth_sendTransaction",
    params: {
      abi: erc20Abi as Abi,
      to: BASE_USDC_ADDRESS,
      data: calldata,
      value: "0",
    },
  });
});