import { Button, ButtonGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ContestModel from '../../../model/ContestModel';
import TableDataRow from '../../../model/TableDataRowModel';
import { formatDate } from '../../../utils/helpers';
import ModalTablesBody from './ModalTablesBody';

interface ContestSummaryTableProps {
    contestData: ContestModel[];
}

const ContestSummaryTable = ({ contestData }: ContestSummaryTableProps) => {
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(0deg)'
        />
    )
    const [selectedContestDetails, setSelectedContestDetails] = useState<TableDataRow[]>([]);
    const [selectedContestStandingLink, setSelectedContestStandingLink] = useState<string>('');
    const [selectedContestTitle, setSelectedContestTitle] = useState<string>('');
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = React.useState(<OverlayOne />)
    const MainTabeHeads = ['Serial', 'Title', 'Event Date', 'Total Participated Teams', 'Top Team Rank', 'AUST Team details']
    const ModalTableHeads = ['Rank', 'Team Name', 'Total Solved', 'Penalty', 'Team Members']

    return (
        <TableContainer>
            <Table variant='simple'>
                <TableCaption></TableCaption>
                <Thead>
                    <Tr>
                        {MainTabeHeads.map((head, index) => (
                            <Th key={index} textAlign='center'>{head}</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        contestData
                            .filter((university) => university.universityShortName === 'AUST')
                            .map((university, universityIndex) => {
                                const sortedData = [...university.data].sort((a, b) => {
                                    return new Date(a.contestDate).getTime() - new Date(b.contestDate).getTime();
                                });

                                const reversedData = sortedData.reverse();
                                reversedData.forEach((contest) => {
                                    contest.universityTeams.sort((a, b) => a.rank - b.rank);
                                });

                                return reversedData.map((contest, contestIndex) => (
                                    <Tr key={universityIndex * 100 + contestIndex}>
                                        <Td textAlign='center'>{universityIndex * university.data.length + contestIndex + 1}</Td>
                                        <Td textAlign='center'>{contest.contestTitle}</Td>
                                        <Td textAlign='center'>{formatDate(contest.contestDate)}</Td>
                                        <Td textAlign='center'>{contest.totalParticipatingTeam}</Td>
                                        <Td textAlign='center'>{contest.universityTeams[0].rank}</Td>
                                        <Td textAlign='center'><Button
                                            colorScheme='blue'
                                            onClick={() => {
                                                setOverlay(<OverlayOne />)
                                                onOpen()
                                                setSelectedContestDetails(contest.universityTeams)
                                                setSelectedContestStandingLink(contest.standingLink)
                                                setSelectedContestTitle(contest.contestTitle)
                                            }}>Details</Button></Td>
                                    </Tr>
                                ));
                            })
                    }


                    <Modal isCentered isOpen={isOpen} onClose={onClose} size='5xl'>
                        {overlay}
                        <ModalContent id='modal-content'>
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

                                        <ModalTablesBody tableData={selectedContestDetails} />


                                    </Table>
                                </TableContainer>
                            </ModalBody>
                            <ModalFooter>
                                <ButtonGroup>
                                    <Link to={selectedContestStandingLink} target="_blank" rel="noopener noreferrer">
                                        <Button colorScheme='blue' > Full Standings </Button>
                                    </Link>

                                    <Button colorScheme='green'>Download</Button>
                                </ButtonGroup>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>

                </Tbody>

            </Table>
        </TableContainer>


    )

}

export default ContestSummaryTable;