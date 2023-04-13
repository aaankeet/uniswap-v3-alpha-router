import {
  AlphaRouter,
  SwapType,
  USDC_MAINNET,
} from '@uniswap/smart-order-router';
import { TradeType, CurrencyAmount, Percent, Token } from '@uniswap/sdk-core';
import { ethers } from 'ethers';
import JSBI from 'jsbi';
import 'dotenv/config';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Provider
const web3Provider = new ethers.providers.JsonRpcProvider(
  process.env.MAINNET_URL
);

// Router
const chainId = 1;
const router = new AlphaRouter({
  chainId: chainId,
  provider: web3Provider,
});

// Tokens
const token1Name = 'Wrapped Ether';
const token1 = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
const token1Symbol = 'WETH';
const decimal1 = 18;

const token2Name = 'USD Coin';
const token2 = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
const token2Symbol = 'USDC';
const decimal2 = 6;

const WETH = new Token(chainId, token1, decimal1, token1Symbol, token1Name);
const USDC = new Token(chainId, token2, decimal2, token2Symbol, token2Name);

const amount = ethers.utils.parseUnits('0.01', 18);
const inputAmount = CurrencyAmount.fromRawAmount(WETH, JSBI.BigInt(amount));

const WALLET_ADDRESS = process.env.ADDRESS;

const main = async () => {
  const options = {
    recipient: WALLET_ADDRESS,
    slippageTolerance: new Percent(20, 10_000),
    deadline: Math.floor(Date.now() / 1000 + 1800),
    type: SwapType.SWAP_ROUTER_02,
  };

  const route = await router.route(
    inputAmount,
    USDC_MAINNET,
    TradeType.EXACT_INPUT,
    options
  );
  console.log(`Quote Exact in: ${route.quote.toFixed()}`);
  // const transaction = {};
};

main();
