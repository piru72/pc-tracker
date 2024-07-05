import { Button, ButtonGroup, Modal, ModalContent, ModalFooter } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { handleCaptureClick } from '../../../common/utils/DownloadImage';
import TableDataRow from '../../../model/TableDataRow';
import ModalTablesBody from './ModalTablesBody';

interface ContestDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    overlay: React.ReactNode;
    contestDetails: TableDataRow[];
    contestStandingLink: string;
    contestTitle: string;
    contestDetailsDiv: string;
}

const ContestDetailsModal = ({ isOpen, onClose, overlay, contestDetails, contestStandingLink, contestTitle, contestDetailsDiv }: ContestDetailsModalProps) => {
    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose} size='5xl'>
            {overlay}
            <ModalContent>
                <div className={contestDetailsDiv}>
                    <ModalTablesBody tableData={contestDetails} selectedContestTitle={contestTitle} />
                </div>
                <ModalFooter>
                    <ButtonGroup>
                        <Link to={contestStandingLink} target="_blank" rel="noopener noreferrer">
                            <Button colorScheme='blue'>Full Standings</Button>
                        </Link>
                        <Button colorScheme='green' onClick={() => handleCaptureClick(contestTitle, contestDetailsDiv)}>Download</Button>
                    </ButtonGroup>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ContestDetailsModal;
