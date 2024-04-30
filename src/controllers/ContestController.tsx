import icpc_data from '../../public/ICPC_DATA';
import iupc_data from '../../public/IUPC_DATA';
import readContestData from '../adapters/csvToJson';
function getIUPCData() {
    return iupc_data;
}

function getICPCData() {
    return icpc_data;
}

function getContestData(contestType: string) {
    return readContestData(contestType);
}
export { getICPCData, getIUPCData, getContestData };
