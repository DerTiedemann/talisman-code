import { fetchRemarks, getRemarksFromBlocks, getLatestFinalizedBlock, Consolidator } from 'rmrk-tools';
import { ApiPromise, WsProvider } from '@polkadot/api';

const wsProvider = new WsProvider('wss://node.rmrk.app');

const fetchAndConsolidate = async () => {
    try {
        const api = await ApiPromise.create({ provider: wsProvider });
        const to = await getLatestFinalizedBlock(api);

        const remarkBlocks = await fetchRemarks(api, 11152862, to, ['']);
        console.log("here")
        if (remarkBlocks && remarkBlocks.length != 0) {
            const remarks = getRemarksFromBlocks(remarkBlocks, []);
            const consolidator = new Consolidator();
            const { nfts, collections } = await consolidator.consolidate(remarks);
            console.log('Consolidated nfts:', nfts);
            console.log('Consolidated collections:', collections);
        }
    } catch (error) {
        console.log(error)
    }
}

fetchAndConsolidate()