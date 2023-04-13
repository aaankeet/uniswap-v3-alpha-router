import {
  AlphaRouter,
  DAI_POLYGON_MUMBAI,
  SWAP_ROUTER_02_ADDRESSES,
  SwapType,
  WETH_POLYGON_MUMBAI,
} from '@uniswap/smart-order-router';
import { TradeType, CurrencyAmount, Percent } from '@uniswap/sdk-core';
import { ethers, BigNumber } from 'ethers';
import JSBI from 'jsbi';
import 'dotenv/config';
import getWethAbi from './getAbi.js';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const WALLET_ADDRESS = process.env.ADDRESS;

// Provider
const web3Provider = new ethers.providers.JsonRpcProvider(
  process.env.MUMBAI_URL
);

// Router
const chainId = 80001;
const router = new AlphaRouter({
  chainId: chainId,
  provider: web3Provider,
});

// Tokens
const WETH = WETH_POLYGON_MUMBAI; // Input Token
const DAI = DAI_POLYGON_MUMBAI; // Output Token

// Amount of Input Token, WETH in this case for 0.01
const amount = ethers.utils.parseUnits('0.005', 18);
const inputAmount = CurrencyAmount.fromRawAmount(WETH, JSBI.BigInt(amount));

const main = async () => {
  console.log(`🟢 Initiating...`);

  const options = {
    recipient: WALLET_ADDRESS, // Address of token Receiver
    slippageTolerance: new Percent(10, 10_000), // Slippage Tolerence : 10%
    deadline: Math.floor(Date.now() / 1000 + 1800),
    type: SwapType.SWAP_ROUTER_02,
  };

  console.log(`📍 Creating Route...`);
  const route = await router.route(
    inputAmount, // Input Token Amount
    DAI, // Output Token
    TradeType.EXACT_INPUT,
    options
  );

  // Amount of Output token receive
  console.log(
    `Expected Quote Amount: ${DAI.symbol} ${route.quote.toFixed(10)}`
  );

  console.log(`📧 Creating Transaction...`);

  // Transaction Details
  const transaction = {
    data: route.methodParameters.calldata,
    to: SWAP_ROUTER_02_ADDRESSES(chainId),
    value: BigNumber.from(route.methodParameters.value),
    from: WALLET_ADDRESS,
    gasPrice: BigNumber.from(route.gasPriceWei),
    gasLimit: ethers.utils.hexlify(500000),
  };

  // Wallet Instance for Sigining Transaction connected to provider (Mumbai)
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, web3Provider);

  // We need to give approval to the SwapRouter smart contract to spend our tokens for us:
  // Create a Weth Contract Instance to call approve

  console.log(`⛏ Getting Abi for Weth token contract...`);
  const WETH_ABI = await getWethAbi(); // Getting Abi for Weth token Contract from Polygonscan

  console.log(`🕔 Creating WETH Contract Instance...`);
  const wethContract = new ethers.Contract(
    WETH_POLYGON_MUMBAI.address,
    WETH_ABI,
    web3Provider
  );
  // console.log(wethContract);
  console.log(`Insatance Created!`);

  const approvalAmount = ethers.utils.parseEther('0.005').toString(); // Amount to approve

  console.log(`💸 Setting Approval for Swap Router to spend our WETH token`);

  // Connect Wallet to Weth contract and call approve
  // Approve Swap Router contract to spend out token
  const routerAddr = SWAP_ROUTER_02_ADDRESSES(chainId);
  await wethContract.connect(wallet).approve(routerAddr, approvalAmount);

  console.log(`📤 Sending Transaction to Swap Router...`);
  const response = await wallet.sendTransaction(transaction);

  console.log(`⛏ Waiting for tx to be mined...`);
  const receipt = await response.wait(2);
  console.log(
    `✅ Tx Successfull, Have a Look --> "https://mumbai.polygonscan.com/tx/${receipt.transactionHash}"`
  );
};

main();
