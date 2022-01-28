"use strict";
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
const rmrk_tools_1 = require("rmrk-tools");
const api_1 = require("@polkadot/api");
const wsProvider = new api_1.WsProvider('wss://node.rmrk.app');
const fetchAndConsolidate = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const api = yield api_1.ApiPromise.create({ provider: wsProvider });
        const to = yield (0, rmrk_tools_1.getLatestFinalizedBlock)(api);
        const remarkBlocks = yield (0, rmrk_tools_1.fetchRemarks)(api, 11152862, to, ['']);
        console.log("here");
        if (remarkBlocks && remarkBlocks.length != 0) {
            const remarks = (0, rmrk_tools_1.getRemarksFromBlocks)(remarkBlocks, []);
            const consolidator = new rmrk_tools_1.Consolidator();
            const { nfts, collections } = yield consolidator.consolidate(remarks);
            console.log('Consolidated nfts:', nfts);
            console.log('Consolidated collections:', collections);
        }
    }
    catch (error) {
        console.log(error);
    }
});
fetchAndConsolidate();
