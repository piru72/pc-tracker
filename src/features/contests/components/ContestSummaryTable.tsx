import { Table, TableCaption, TableContainer, Tbody } from '@chakra-ui/react';
import ContestModel from '../../../model/Contest';
import useContestModal from '../hooks/UseContestModal';
import ContestDetailsModal from './ContestDetailsModal';
import TableHeader from './TableHeader';
import TableRows from './TableRows';

interface ContestSummaryTableProps {
    contestData: ContestModel[];
    universityShortName: string;
}

const ContestSummaryTable = ({ contestData, universityShortName }: ContestSummaryTableProps) => {
    const {
        isOpen,
        onOpen,
        onClose,
        overlay,
        selectedContestDetails,
        selectedContestStandingLink,
        selectedContestTitle,
    } = useContestModal();

    const MainTabeHeads = ['Serial', 'Title', 'Event Date', 'Total Participated Teams', 'Top Team Rank', universityShortName + ' Team details'];
    const contestDetailsDiv = 'contest-details-table';

    return (
        <TableContainer>
            <Table variant='simple'>
                <TableCaption></TableCaption>
                <TableHeader headers={MainTabeHeads} />
                <Tbody>
                    <TableRows contestData={contestData} universityShortName={universityShortName} onOpen={onOpen} />
                </Tbody>
            </Table>

            <ContestDetailsModal
                isOpen={isOpen}
                onClose={onClose}
                overlay={overlay}
                contestDetails={selectedContestDetails}
                contestStandingLink={selectedContestStandingLink}
                contestTitle={selectedContestTitle}
                contestDetailsDiv={contestDetailsDiv}
            />
        </TableContainer>
    );
};

export default ContestSummaryTable;
