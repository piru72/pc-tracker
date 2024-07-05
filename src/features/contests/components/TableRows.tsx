import { Button, Td, Tr } from '@chakra-ui/react';
import { formatDate } from '../../../common/utils/helpers';
import ContestModel from '../../../model/Contest';
import TableDataRow from '../../../model/TableDataRow';

interface TableRowsProps {
    contestData: ContestModel[];
    universityShortName: string;
    onOpen: (contestDetails: TableDataRow[], standingLink: string, title: string) => void;
}

const TableRows = ({ contestData, universityShortName, onOpen }: TableRowsProps) => (
    <>
        {contestData
            .filter((university) => university.universityShortName === universityShortName)
            .map((university, universityIndex) => {
                const sortedData = [...university.data].sort((a, b) => new Date(a.contestDate).getTime() - new Date(b.contestDate).getTime());
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
                        <Td textAlign='center'>
                            <Button colorScheme='blue' onClick={() => onOpen(contest.universityTeams, contest.standingLink, contest.contestTitle)}>
                                Details
                            </Button>
                        </Td>
                    </Tr>
                ));
            })}
    </>
);

export default TableRows;
