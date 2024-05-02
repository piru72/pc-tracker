import { Box, Flex, Stat, StatNumber, useColorModeValue } from '@chakra-ui/react'

interface StatsCardProps {
    name: string
    totaParticipatedContest: string
}
function StatCard(props: StatsCardProps) {
    const { name, totaParticipatedContest } = props
    return (
        <Stat
            px={{ base: 2, md: 4 }}
            py={'5'}
            shadow={'xl'}
            border={'1px solid'}
            borderColor={useColorModeValue('gray.800', 'gray.500')}
            rounded={'lg'}>
            <Flex justifyContent={'space-between'}>
                <Box pl={{ base: 2, md: 5 }}>
                    <StatNumber fontSize={'xl'} fontWeight={'medium'} textAlign={'left'}>
                        {name}
                    </StatNumber>
                    <StatNumber fontSize={'xl'} fontWeight={'medium'} textAlign={'left'}>
                        Contest Count : {totaParticipatedContest}
                    </StatNumber>
                </Box>
            </Flex>
        </Stat>
    )
}
export default StatCard;