import { Table, TableCaption, TableContainer, Tbody } from '@chakra-ui/react';
import { CONTEST_DETAILS_DIV, MAIN_TABLE_HEADS } from '../constants/contestSummaryTable.constant';
import useContestModal from '../hooks/UseContestModal';
import ContestModel from '../../../common/interfaces/contest.interface';
import ContestDetailsModal from './ContestDetailsModal';
import TableHeader from '../../../components/tableHeader/TableHeader';
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



    return (
        <TableContainer>
            <Table variant='simple'>
                <TableCaption></TableCaption>
                <TableHeader headers={MAIN_TABLE_HEADS} />
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
                contestDetailsDiv={CONTEST_DETAILS_DIV}
            />
        </TableContainer>
    );
};

export default ContestSummaryTable;
