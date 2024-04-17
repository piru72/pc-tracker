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
    const [selectedContestDetails, setSelectedContestDetails] = useState<TableDataRow[]>([]);
    const [selectedContestStandingLink, setSelectedContestStandingLink] = useState<string>('');
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = React.useState(<OverlayOne />)

    return (
        <TableContainer>
            <Table variant='simple'>
                <TableCaption></TableCaption>
                <Thead>
                    <Tr>
                        <Th>Serial</Th>
                        <Th>Title</Th>
                        <Th>Date</Th>
                        <Th isNumeric>Total Participating Team</Th>
                        <Th isNumeric>Top Teams Rank</Th>
                        <Th isNumeric>Details</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        contestData.filter((university) => university.universityShortName === 'AUST').map((university, index) => {
                            return (
                                <Tr key={index}>
                                    <Td>{index + 1}</Td>
                                    <Td>{university.data[0].contestTitle}</Td>
                                    <Td>{university.data[0].contestDate}</Td>
                                    <Td isNumeric>{university.data[0].totalParticipatingTeam}</Td>
                                    <Td isNumeric>{university.data[0].universityTeams[0].rank}</Td>
                                    <Td isNumeric ><Button
                                        colorScheme='blue'
                                        onClick={() => {
                                            setOverlay(<OverlayOne />)
                                            onOpen()
                                            setSelectedContestDetails(university.data[0].universityTeams)
                                            setSelectedContestStandingLink(university.data[0].standingLink)
                                        }}> Details</Button></Td>
                                </Tr>
                            )
                        })
                    }
                    <Modal isCentered isOpen={isOpen} onClose={onClose} size='5xl'>
                        {overlay}
                        <ModalContent id='modal-content'>
                            <ModalHeader textAlign={'center'}>NCPC Onsite JU 2023</ModalHeader>
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
                                                                {member}
                                                                {memberIndex !== row.teamMembers.length - 1 && <br />}
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