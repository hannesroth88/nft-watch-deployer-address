"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const discord_js_1 = require("discord.js");
const config = __importStar(require("./config"));
const ADDRESS = process.env["ADDRESS"];
/* SETUP Discord */
const DISCORD_TOKEN = process.env["DISCORD_TOKEN"];
const DISCORD_CHANNELID = process.env["DISCORD_CHANNELID"];
const webhookClient = new discord_js_1.WebhookClient({ id: DISCORD_CHANNELID, token: DISCORD_TOKEN });
// MAIN FUNCTION
main();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const provider = config.getProvider("etherscan");
        console.log({ provider: provider.baseUrl, network: provider._network.name });
        provider.on("block", (blockNumber) => __awaiter(this, void 0, void 0, function* () {
            console.log(blockNumber);
            // looking at previous block -1 was not working during test, Sync Etherscan? -> taking -2
            const history = yield provider.getHistory(ADDRESS, blockNumber - 2, blockNumber - 2);
            if (history && history.length > 0) {
                console.log("NEW TRANSACTION");
                console.log(history);
                sendDiscord(JSON.stringify(history, null, 2));
            }
        }));
    });
}
function sendDiscord(content) {
    webhookClient.send({
        content: content,
        username: "NFT Bot",
        avatarURL: "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency/512/Ethereum-icon.png",
    });
}
