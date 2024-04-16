import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import SectionTitle from '../components/title/SectionTitle';
import ncpc_data from '../utils/NCPC_DATA';
import ContestSummaryTable from './contests/components/ContestSummaryTable';

const Index = () => {
    return (
        <Box maxW="10xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
            <SectionTitle title='Ahsanullah University of Science and Technology' />

            <Tabs isFitted variant='enclosed'>
                <TabList mb='1em'>
                    <Tab>IUPC</Tab>
                    <Tab>ICPC</Tab>
                    <Tab>NCPC</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                    </TabPanel>
                    <TabPanel>
                    </TabPanel>
                    <TabPanel>
                        <ContestSummaryTable
                            contestData={ncpc_data} />

                    </TabPanel>
                </TabPanels>
            </Tabs>


        </Box>
    );
}

export default Index;