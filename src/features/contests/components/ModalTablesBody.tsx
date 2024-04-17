import { Tbody, Td, Tr } from '@chakra-ui/react';
import React from 'react';
import TableDataRow from '../../../model/TableDataRowModel';

interface ModalTablesBodyProps {
    tableData: TableDataRow[];
}

const ModalTablesBody: React.FC<ModalTablesBodyProps> = ({ tableData }) => {
    return (
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
    );
};

export default ModalTablesBody;