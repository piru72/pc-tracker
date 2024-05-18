import readContestData from '../adapters/csvToJson';


function getContestData(contestType: string) {
    return readContestData(contestType);
}
export { getContestData };

