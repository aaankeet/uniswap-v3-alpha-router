# uniswap-v3-alpha-router


**GET BEST PRICE FOR YOUR TOKEN SWAPS PROGRAMMTICALLY**

This guide will cover how to use Uniswap's smart order router to compute optimal routes and execute swaps. Rather than trading between a single pool, smart routing may use multiple hops (as many as needed) to ensure that the end result of the swap is the optimal price.

In this example we will trade between WETH and DAI on Polygon Mumbai Network, but you can configure your example to use any two currencies and amount of input currency.

**We will cover:**
1. Creating a router instance
2. Create a route
3. Swap using a route

At the end of the guide, we should be able to create a route and execute a swap between any two currencies (tokens) programmatically.
