import * as dotenv from "dotenv"
dotenv.config()
import { ethers } from "ethers"
import { WebhookClient } from "discord.js"
import * as config from "./config/config"
import { Wallet } from "../types/wallet"
import { History } from "../types/history"

const wallets = config.getWallets() as Wallet[]

/* SETUP Discord */
const DISCORD_TOKEN = process.env["DISCORD_TOKEN"] as string
const DISCORD_CHANNELID = process.env["DISCORD_CHANNELID"] as string
const webhookClient = new WebhookClient({ id: DISCORD_CHANNELID, token: DISCORD_TOKEN })

// MAIN FUNCTION
main()

async function main() {
    const provider = config.getProvider("etherscan") as ethers.providers.EtherscanProvider
    console.log({ provider: provider.baseUrl, network: provider._network.name })

    provider.on("block", async (blockNumber) => {
        console.log(blockNumber)

        const histories: History[] = []
        for (const wallet of wallets) {
            // looking at previous block -1 was not working during test, Sync Etherscan? -> taking -2
            const txResponse = await provider.getHistory(
                wallet.address,
                blockNumber - 2,
                blockNumber - 2
            )
            if (txResponse && txResponse.length > 0) {
                const history: History = { txResponse: txResponse, wallet: wallet }
                histories.push(history)
                console.log("NEW TRANSACTION")
                console.log(history)
            }
        }
        if (histories && histories.length > 0) {
            sendDiscord(JSON.stringify(histories, null, 2))
        } else {
            console.log("no new Tx");
        }
    })
}
function sendDiscord(content: string) {
    webhookClient.send({
        content: content,
        username: "NFT Bot",
        avatarURL:
            "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency/512/Ethereum-icon.png",
    })
}
