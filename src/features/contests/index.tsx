
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import SectionTitle from '../../components/title/SectionTitle';
import { getContestData } from '../../controllers/ContestController';
import ContestSummaryTable from './components/ContestSummaryTable';
const universityShortName = 'AUST';
const universityFullName = 'Ahsanullah University of Science and Technology';

const Index = () => {
    const iupc_data = getContestData('IUPC');
    const icpc_data = getContestData('ICPC');
    const ncpc_data = getContestData('NCPC');
    const contestName = ['IUPC', 'ICPC', 'NCPC']
    const contestData = [iupc_data, icpc_data, ncpc_data];
    return (
        <Box maxW="10xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>

            <SectionTitle title={universityFullName} />

            <Tabs isFitted variant='enclosed'>
                <TabList mb='1em'>
                    {contestName.map((contest , index)=>
                    (
                        <Tab key={index}>{contest}</Tab>)
                    )}
                </TabList>
                <TabPanels>
                    {contestData.map((contest, index) => (
                        <TabPanel key={index}>
                            <ContestSummaryTable contestData={contest}
                            universityShortName={universityShortName} />
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>


        </Box>
    );
}

export default Index;