import * as dotenv from "dotenv"
dotenv.config()
import { ethers } from "ethers"
import { Wallet } from "../../types/wallet"
import jsonWallets from "./wallets.json"

const INFURA_API_KEY = process.env["INFURA_API_KEY"]
const ETHERSCAN_API_KEY = process.env["ETHERSCAN_API_KEY"]
const JSONRPC_URL = process.env["JSONRPC_URL"]
const ETHEREUM_NETWORK = process.env["ETHEREUM_NETWORK"]

const providers: {
    etherscan: ethers.providers.EtherscanProvider
    infura: ethers.providers.InfuraProvider
    localnode: ethers.providers.JsonRpcProvider
} = {
    etherscan: new ethers.providers.EtherscanProvider(ETHEREUM_NETWORK, ETHERSCAN_API_KEY),
    infura: new ethers.providers.InfuraProvider(ETHEREUM_NETWORK, INFURA_API_KEY),
    localnode: new ethers.providers.JsonRpcProvider(JSONRPC_URL, ETHEREUM_NETWORK),
}

export function getProvider(providerName: string): any {
    // @ts-ignore
    return providers[providerName]
}

export function getWallets(): Wallet[] {
    return jsonWallets
}
