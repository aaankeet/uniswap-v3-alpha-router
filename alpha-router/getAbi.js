import axios from 'axios';

const API_KEY = process.env.POLYGON_API_KEY;
const contractAddress = '0x195fe6EE6639665CCeB15BCCeB9980FC445DFa0B';
const url = `https://api-testnet.polygonscan.com/api?module=contract&action=getabi&address=${contractAddress}&apikey=${API_KEY}`;

export default async function getWethAbi() {
  const response = await axios.get(url);
  const abi = JSON.parse(response.data.result);

  return abi;
}
