import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import SectionTitle from '../components/title/SectionTitle';
import { getIUPCData, getICPCData, getNCPCData } from '../controllers/ContestController'
import ContestSummaryTable from './contests/components/ContestSummaryTable';

const universityShortName = 'AUST';
const universityFullName = 'Ahsanullah University of Science and Technology';
const Index = () => {
    const iupc_data = getIUPCData();

    return (
        <Box maxW="10xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
            
            <SectionTitle title={universityFullName} />

            <Tabs isFitted variant='enclosed'>
                <TabList mb='1em'>
                    <Tab>IUPC</Tab>
                    <Tab>ICPC</Tab>
                    <Tab>NCPC</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <ContestSummaryTable
                            contestData={iupc_data}
                            universityShortName={universityShortName} />
                    </TabPanel>
                    <TabPanel>
                        <ContestSummaryTable
                            contestData={getICPCData()}
                            universityShortName={universityShortName} />

                    </TabPanel>
                    <TabPanel>
                        <ContestSummaryTable
                            contestData={getNCPCData()}
                            universityShortName={universityShortName} />

                    </TabPanel>
                </TabPanels>
            </Tabs>


        </Box>
    );
}

export default Index;