

import React from 'react';
import { Box, ButtonGroup, Divider, Heading, ModalFooter, Table, TableCaption, TableContainer, Tbody, Th, Thead, Tr, Text } from '@chakra-ui/react';

interface ModalContentExtendedProps {

    contestantName: string;
}

const ModalContentExtended: React.FC<ModalContentExtendedProps> = ({ contestantName }) => {
    const ModalTableHeads = ['Contest Name','Rank', 'Team Name', 'Total Solved', 'Penalty', 'Team Members']
    return (
        <>
            <Box padding={5} >
                <Heading as='h1' size='xl' noOfLines={1} mb={4}>
                    Contest Profile of
                    <Text as={'span'} color={'blue.400'}>
                        {' ' + contestantName}
                    </Text>
                </Heading>
                <Divider />
                <TableContainer>
                    <Table size='lg' variant='simple'>
                        <TableCaption></TableCaption>
                        <Thead>
                            <Tr>
                                {ModalTableHeads.map((head, index) => (
                                    <Th key={index} textAlign='center'>{head}</Th>
                                ))}
                            </Tr>
                        </Thead>
                        <Tbody>

                            {/* this is where the data will be displayed */}

                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
            <ModalFooter>
                <ButtonGroup>

                </ButtonGroup>
            </ModalFooter>
        </>

    );
};

export default ModalContentExtended;