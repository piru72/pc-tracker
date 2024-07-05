import { Box } from '@chakra-ui/react';
import ContestTable from './contests/index';
import ContestantData from './contestants/index';
export const Index = () => {
    return (
        <Box maxW="10xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
            < ContestTable />
            < ContestantData />
        </Box>
    );
}

