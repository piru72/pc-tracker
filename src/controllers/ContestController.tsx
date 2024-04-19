import icpc_data from '../../public/ICPC_DATA';
import iupc_data from '../../public/IUPC_DATA';
import ncpc_data from '../../public/NCPC_DATA';
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