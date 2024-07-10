import { Th, Thead, Tr } from '@chakra-ui/react';

interface TableHeaderProps {
    headers: string[];
}

const TableHeader = ({ headers }: TableHeaderProps) => (
    <Thead>
        <Tr>
            {headers.map((head, index) => (
                <Th key={index} textAlign='center'>{head}</Th>
            ))}
        </Tr>
    </Thead>
);

export default TableHeader;
