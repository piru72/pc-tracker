import { Heading, Modal, ModalContent, ModalOverlay, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import React from 'react';
import { getFinalData, mergeMap } from '../../adapters/jsonToMap';
import { getContestData } from '../../controllers/ContestController';
import ModalContentExtended from "./components/modalTable";
import StatsCard from './components/statsCard';

export default function Index() {
    const iupc_data = getContestData('IUPC');
    const icpc_data = getContestData('ICPC');
    const ncpc_data = getContestData('NCPC');

    let iupcStats = getFinalData(iupc_data);
    let icpcStats = getFinalData(icpc_data);
    let ncpcStats = getFinalData(ncpc_data);

    let allStat = mergeMap(iupcStats, icpcStats, ncpcStats);


    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(0deg)'
        />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = React.useState(<OverlayOne />)
    const [contestantName, setContestantName] = React.useState('')
    return (

        <>
            <Heading>The List of contestants </Heading>
            <SimpleGrid columns={{ base: 1, md: 5 }} spacing={10}>
                {
                    Array.from(allStat.keys()).map((name, index) => (

                        <a key={index} target="_blank" rel="noreferrer"
                            onClick={() => {
                                setOverlay(<OverlayOne />)
                                onOpen()
                                setContestantName(name)
                            }}>
                            <StatsCard key={index}
                                name={name}
                                totaParticipatedContest={allStat.get(name)?.toString() || ''}
                            />
                        </a>
                    ))
                }
            </SimpleGrid>
            <Modal isCentered isOpen={isOpen} onClose={onClose} size='5xl'>
                {overlay}
                <ModalContent >
                    <ModalContentExtended contestantName={contestantName} />
                </ModalContent>
            </Modal>
        </>
    );
}





