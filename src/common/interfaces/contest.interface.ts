export default interface CONTEST_DATA {
    universityFullName: string;
    universityShortName: string;
    data: {
        contestTitle: string;
        contestDate: string;
        standingLink: string;
        totalParticipatingTeam: number;
        universityTeams: {
            rank: number;
            teamName: string;
            totalSolved: number;
            penalty: number;
            teamMembers: string[];
        }[]
    }[]
}