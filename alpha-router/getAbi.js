// Fetch contract Abi from polgonscan
// Contract must be verified

// Import Axios to make get call
import axios from 'axios';

// Polygonscan Api Key
const API_KEY = process.env.POLYGON_API_KEY;

// Contract address
const contractAddress = '0x195fe6EE6639665CCeB15BCCeB9980FC445DFa0B';

// Polygonscan url for getting abi of any verified contract address
const url = `https://api-testnet.polygonscan.com/api?module=contract&action=getabi&address=${contractAddress}&apikey=${API_KEY}`;

// Getting Abi for WETH contract deployed on Mumbai Testnet
export default async function getWethAbi() {
  const response = await axios.get(url);
  const abi = JSON.parse(response.data.result);

  return abi;
}
