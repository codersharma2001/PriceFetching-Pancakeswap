const ethers = require('ethers');

const {
    factoryAddress,
    routerAddress,
    fromAddress,
    toAddress
} = require('./AddressList');

const {erc20ABI, factoryABI, pairABI, routerABI}= require("./ABIInfo");

const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/'); //BSC Mainnet
const factoryInstance = new ethers.Contract(
    factoryAddress, factoryABI, provider
)

const routerInstance = new ethers.Contract(
    routerAddress, routerABI, provider
)

// console.log("factoryInstance",factoryInstance);

const priceFetch = async () => {
    const token1 = new ethers.Contract(
        fromAddress, erc20ABI, provider
    )

    const token2 = new ethers.Contract(
        toAddress, erc20ABI, provider
    )
    const decimal1 = await token1.decimals();
    const decimal2 = await token2.decimals();

    const amountIn = ethers.utils.parseUnits(humanFormat,decimal1).toString();
    const amountOut = await routerInstance.getAmountsOut(amountIn, [fromAddress, toAddress])
    const humanOutput = ethers.utils.formatUnits(
        amountOut[1].toString(), decimal2
    )
    // console.log("decimal1",decimal1);
    console.log("This is the number of WBNB " , humanOutput)
    // console.log("amountIn",amountIn);
}
humanFormat = "100"
priceFetch();