import * as dotenv from "dotenv"
dotenv.config()
import { ethers } from "ethers"
import { WebhookClient } from "discord.js"
import * as config from "./config"

const ADDRESS = process.env["ADDRESS"] as string

/* SETUP Discord */
const DISCORD_TOKEN = process.env["DISCORD_TOKEN"] as string
console.log(DISCORD_TOKEN);

const DISCORD_CHANNELID = process.env["DISCORD_CHANNELID"] as string
const webhookClient = new WebhookClient({ id: DISCORD_CHANNELID, token: DISCORD_TOKEN })

// MAIN FUNCTION
main()

async function main() {
    const provider = config.getProvider("etherscan") as ethers.providers.EtherscanProvider
    console.log({ provider: provider.baseUrl, network: provider._network.name })

    provider.on("block", async (blockNumber) => {
        console.log(blockNumber)

        // looking at previous block -1 was not working during test, Sync Etherscan? -> taking -2
        const history = await provider.getHistory(ADDRESS, blockNumber - 2, blockNumber - 2)
        if (history && history.length > 0) {
            console.log("NEW TRANSACTION")
            console.log(history)

            sendDiscord(JSON.stringify(history, null, 2))
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
