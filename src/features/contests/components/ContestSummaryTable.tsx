import { Button, ButtonGroup, Modal, ModalContent, ModalFooter, ModalOverlay, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ContestModel from '../../../model/ContestModel';
import TableDataRow from '../../../model/TableDataRowModel';
import { formatDate } from '../../../utils/helpers';
import ModalTablesBody from './ModalTablesBody';
interface ContestSummaryTableProps {
    contestData: ContestModel[];
}
const handleCaptureClick = async (imageTitle: string, divName: string) => {
    const dessiredElement =
        document.querySelector<HTMLElement>('.'+divName);
    if (!dessiredElement) return;

    const copiedElement = dessiredElement.cloneNode(
        true
    ) as HTMLElement;
    copiedElement.style.position = 'fixed';
    copiedElement.style.right = '100%';
    copiedElement.style.height = 'auto';

    document.body.append(copiedElement);

    const canvas = await html2canvas(copiedElement);

    copiedElement.remove();

    const dataURL = canvas.toDataURL('image/png');
    downloadjs(dataURL, imageTitle+'.png', 'image/png');
};

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
    const contestDetailsDiv = 'contest-details-table';

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
                        <ModalContent >
                            <div className={contestDetailsDiv}>
                                <ModalTablesBody
                                    tableData={selectedContestDetails}
                                    selectedContestTitle={selectedContestTitle}
                                />
                            </div>
                            <ModalFooter>
                                <ButtonGroup>
                                    <Link to={selectedContestStandingLink} target="_blank" rel="noopener noreferrer">
                                        <Button colorScheme='blue' > Full Standings </Button>
                                    </Link>
                                    <Button colorScheme='green'
                                        onClick={() => handleCaptureClick(selectedContestTitle, contestDetailsDiv)}  >Download</Button>
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