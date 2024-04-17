import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

import { Button, ButtonGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import ContestModel from '../../../model/ContestModel';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface ContestSummaryTableProps {
    contestData: ContestModel[];
}

interface TableDataRow {
    rank: number;
    teamName: string;
    totalSolved: number;
    penalty: number;
    teamMembers: string[];
}

const ContestSummaryTable = ({ contestData }: ContestSummaryTableProps) => {
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(0deg)'
        />
    )
    function formatDate(dateString: string): string {
        const dateParts: string[] = dateString.split('-');
        const year: string = dateParts[0];
        const month: string = dateParts[1];
        const day: string = dateParts[2];


        const monthNames: string[] = [
            'January', 'February', 'March', 'April',
            'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'
        ];


        const date: Date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day)); // Month needs to be 0-indexed

        const formattedDate: string = `${day} ${monthNames[date.getMonth()]} ${year}`;

        return formattedDate;
    }
    const [selectedContestDetails, setSelectedContestDetails] = useState<TableDataRow[]>([]);
    const [selectedContestStandingLink, setSelectedContestStandingLink] = useState<string>('');
    const [selectedContestTitle, setSelectedContestTitle] = useState<string>('');
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = React.useState(<OverlayOne />)

    return (
        <TableContainer>
            <Table variant='simple'>
                <TableCaption></TableCaption>
                <Thead>
                    <Tr>
                        <Th textAlign='center'>Serial</Th>
                        <Th textAlign='center'>Title</Th>
                        <Th textAlign='center'>Date</Th>
                        <Th textAlign='center'>Total Participating Team</Th>
                        <Th textAlign='center'>Top Teams Rank</Th>
                        <Th textAlign='center'>Details</Th>
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
                                                <Th textAlign='center'>Rank</Th>
                                                <Th textAlign='center'>Team Name</Th>
                                                <Th textAlign='center'>Total Solved</Th>
                                                <Th textAlign='center'>Penalty</Th>
                                                <Th textAlign='center'>Team Members</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {selectedContestDetails.map((row, index) => (
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
                            <ModalFooter>
                                <ButtonGroup>
                                    <Link to={selectedContestStandingLink} target="_blank" rel="noopener noreferrer">
                                        <Button colorScheme='blue' > Standings </Button>
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