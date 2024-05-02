import { Heading, SimpleGrid } from "@chakra-ui/react";
import { getContestData } from '../../controllers/ContestController';
import StatsCard from './components/statsCard';
import { getFinalData , mergeMap } from '../../adapters/jsonToMap';

export default function Index() {
    const iupc_data = getContestData('IUPC');
    const icpc_data = getContestData('ICPC');
    const ncpc_data = getContestData('NCPC');

    let iupcStats = getFinalData(iupc_data);
    let icpcStats = getFinalData(icpc_data);
    let ncpcStats = getFinalData(ncpc_data);

    let allStat = mergeMap(iupcStats, icpcStats, ncpcStats);
    

    return (

        <>
            <Heading>The List of contestants </Heading>
            <SimpleGrid columns={{ base: 1, md: 5 }} spacing={10}>
                {
                    Array.from(allStat.keys()).map((name, index) => (
                        <StatsCard key={index}
                            name={name}
                            totaParticipatedContest={allStat.get(name)?.toString() || ''}
                        />
                    ))
                }
            </SimpleGrid>
        </>
    );
}





