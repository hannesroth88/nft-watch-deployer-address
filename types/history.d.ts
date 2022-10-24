import { Wallet } from "./wallet"

export type History = {
    txResponse: ethers.providers.TransactionResponse[]
    wallet: Wallet
}