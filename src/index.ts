import { BaseProvider } from "@ethersproject/providers"
import * as dotenv from "dotenv"
dotenv.config()
import { ethers } from "ethers"

const ADDRESS = process.env["ADDRESS"] as string
const INFURA_API_KEY = process.env["INFURA_API_KEY"]
const ETHERSCAN_API_KEY = process.env["ETHERSCAN_API_KEY"]
const JSONRPC_URL = process.env["JSONRPC_URL"]
const ETHEREUM_NETWORK = "mainnet"

// MAIN FUNCTION
main()

async function main() {
    const providers: any = {}
    providers.etherscan = new ethers.providers.EtherscanProvider(
        ETHEREUM_NETWORK,
        ETHERSCAN_API_KEY
    )
    providers.infura = new ethers.providers.InfuraProvider(ETHEREUM_NETWORK, INFURA_API_KEY)
    providers.localnode = new ethers.providers.JsonRpcProvider(JSONRPC_URL, ETHEREUM_NETWORK)

    const provider = providers.localnode as BaseProvider

    console.log("Start looking for pending TXs")

    provider.on("pending", async (txHash) => {        
        console.log(txHash.from.toLowerCase())
        // look for pending transactions from Address
        if (txHash.from.toLowerCase() == ADDRESS.toLowerCase()) {
            console.log(txHash)
        }
    })
}
