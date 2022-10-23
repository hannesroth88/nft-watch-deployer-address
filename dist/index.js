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
const ethers_1 = require("ethers");
const ADDRESS = process.env["ADDRESS"];
const INFURA_API_KEY = process.env["INFURA_API_KEY"];
const ETHERSCAN_API_KEY = process.env["ETHERSCAN_API_KEY"];
const JSONRPC_URL = process.env["JSONRPC_URL"];
const ETHEREUM_NETWORK = "mainnet";
// MAIN FUNCTION
main();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const providers = {};
        providers.etherscan = new ethers_1.ethers.providers.EtherscanProvider(ETHEREUM_NETWORK, ETHERSCAN_API_KEY);
        providers.infura = new ethers_1.ethers.providers.InfuraProvider(ETHEREUM_NETWORK, INFURA_API_KEY);
        providers.localnode = new ethers_1.ethers.providers.JsonRpcProvider(JSONRPC_URL, ETHEREUM_NETWORK);
        const provider = providers.localnode;
        console.log("Start looking for pending TXs");
        provider.on("pending", (txHash) => __awaiter(this, void 0, void 0, function* () {
            console.log(txHash.from.toLowerCase());
            // look for pending transactions from Address
            if (txHash.from.toLowerCase() == ADDRESS.toLowerCase()) {
                console.log(txHash);
            }
        }));
    });
}
