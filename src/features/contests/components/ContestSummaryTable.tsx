import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import ContestModel from '../../../model/ContestModel';

interface ContestSummaryTableProps {
    contestData: ContestModel[];
}


const ContestSummaryTable = ({contestData}: ContestSummaryTableProps) => {
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(0deg)'
        />
    )
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
                                        }}> Details</Button></Td>
                                </Tr>
                            )
                        })
                    }
                    <Modal isCentered isOpen={isOpen} onClose={onClose} size='5xl'>
                        {overlay}
                        <ModalContent>
                            <ModalHeader textAlign={'center'}>NCPC Onsite JU 2023</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <TableContainer>
                                    <Table variant='simple'>
                                        <TableCaption></TableCaption>
                                        <Thead>
                                            <Tr>
                                                <Th>Rank</Th>
                                                <Th>Team Name</Th>
                                                <Th>Total Solved</Th>
                                                <Th isNumeric>Penalty</Th>
                                                <Th isNumeric>Team Members</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                        </Tbody>

                                    </Table>
                                </TableContainer>
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme='blue'>Full Standing</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>

                </Tbody>

            </Table>
        </TableContainer>


    )

}

export default ContestSummaryTable;