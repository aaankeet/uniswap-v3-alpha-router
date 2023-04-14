# uniswap-v3-alpha-router


**GET BEST PRICE FOR YOUR TOKEN SWAPS PROGRAMMTICALLY**

This guide will cover how to use Uniswap's smart order router to compute optimal routes and execute swaps. Rather than trading between a single pool, smart routing may use multiple hops (as many as needed) to ensure that the end result of the swap is the optimal price.

In this example we will trade between WETH and DAI on Polygon Mumbai Network, but you can configure your example to use any two currencies and amount of input currency.

**We will cover:**
1. Creating a router instance
2. Create a route
3. Swap using a route

At the end of the guide, we should be able to create a route and execute a swap between any two currencies (tokens) programmatically.

For this guide, the following Uniswap packages are used:

* [@uniswap/v3-sdk](https://www.npmjs.com/package/@uniswap/v3-sdk)
* [@uniswap/sdk-core](https://www.npmjs.com/package/@uniswap/sdk-core)
* [@uniswap/smart-order-router](https://www.npmjs.com/package/@uniswap/smart-order-router)

# Install the Dependencies:
```
  npm install
```
# Create a .env file and add all the environment variables:
```
  touch .env
```
# In .env file add the following variables:
```
  PRIVATE_KEY= "YOUR PRIVATE KEY"
  MUMBAI_RPC_URL= "YOUR MUMBAI RPC URL"
  POLYGON_API_KEY= "YOUR POLYGON API KEY"
  WALLET_ADDRESS= "YOUR WALLET ADDRESS"
  ```
  
  
  
