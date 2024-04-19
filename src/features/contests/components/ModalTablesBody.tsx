import { ModalBody, ModalCloseButton, ModalHeader, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import TableDataRow from '../../../model/TableDataRowModel';

interface ModalTablesBodyProps {
    tableData: TableDataRow[];
    selectedContestTitle: string;
}

const ModalTablesBody: React.FC<ModalTablesBodyProps> = ({ tableData, selectedContestTitle }) => {
    const ModalTableHeads = ['Rank', 'Team Name', 'Total Solved', 'Penalty', 'Team Members']
    return (
        <>
            <ModalHeader textAlign={'center'}>{selectedContestTitle}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
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
                            {tableData.map((row, index) => (
                                <Tr key={index}>
                                    <Td textAlign='center'>{row.rank}</Td>
                                    <Td textAlign='center'>{row.teamName}</Td>
                                    <Td textAlign='center'>{row.totalSolved}</Td>
                                    <Td textAlign='center'>{row.penalty}</Td>
                                    <Td textAlign='center'>
                                        {row.teamMembers.map((member, memberIndex) => (
                                            <React.Fragment key={memberIndex}>
                                                {member || "N/A"}
                                                {memberIndex !== 2 && <br />} {/* Only add <br> for the first two members */}
                                            </React.Fragment>
                                        ))}
                                    </Td>

                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </ModalBody>
        </>

    );
};

export default ModalTablesBody;