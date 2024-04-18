import icpc_data from '../utils/ICPC_DATA';
import iupc_data from '../utils/IUPC_DATA';
import ncpc_data from '../utils/NCPC_DATA';
function getIUPCData() {
    return iupc_data;
}

function getICPCData() {
    return icpc_data;
}

function getNCPCData() {
    return ncpc_data;
}

export { getIUPCData, getICPCData, getNCPCData };