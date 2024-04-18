import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import SectionTitle from '../components/title/SectionTitle';
import { getIUPCData, getICPCData, getNCPCData } from '../controllers/ContestController'
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
                        <ContestSummaryTable
                            contestData={getIUPCData()} />
                    </TabPanel>
                    <TabPanel>
                        <ContestSummaryTable
                            contestData={getICPCData()} />

                    </TabPanel>
                    <TabPanel>
                        <ContestSummaryTable
                            contestData={getNCPCData()} />

                    </TabPanel>
                </TabPanels>
            </Tabs>


        </Box>
    );
}

export default Index;