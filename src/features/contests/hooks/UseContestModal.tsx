import { ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import TableDataRow from '../../../model/TableDataRow';

const useContestModal = () => {
    const [selectedContestDetails, setSelectedContestDetails] = useState<TableDataRow[]>([]);
    const [selectedContestStandingLink, setSelectedContestStandingLink] = useState<string>('');
    const [selectedContestTitle, setSelectedContestTitle] = useState<string>('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(0deg)'
        />
    );
    const [overlay, setOverlay] = useState(<OverlayOne />);

    const openModal = (contestDetails: TableDataRow[], standingLink: string, title: string) => {
        setOverlay(<OverlayOne />);
        onOpen();
        setSelectedContestDetails(contestDetails);
        setSelectedContestStandingLink(standingLink);
        setSelectedContestTitle(title);
    };

    return {
        isOpen,
        onOpen: openModal,
        onClose,
        overlay,
        selectedContestDetails,
        selectedContestStandingLink,
        selectedContestTitle,
    };
};

export default useContestModal;
