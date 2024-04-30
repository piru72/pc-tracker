import Papa from 'papaparse';
import { useEffect, useState } from 'react';
import CONTEST_DATA from '../model/ContestModel';

function convertToContestData(csvRow: any): CONTEST_DATA {
    const universityShortName = csvRow.universityShortName || "";
    const data = [
        {
            contestTitle: csvRow.contestTitle,
            contestDate: csvRow.contestDate,
            standingLink: csvRow.standingLink,
            totalParticipatingTeam: parseInt(csvRow.totalParticipatingTeam, 10),
            universityTeams: [
                {
                    rank: parseInt(csvRow.rank, 10),
                    teamName: csvRow.teamName,
                    totalSolved: parseInt(csvRow.totalSolved, 10),
                    penalty: parseInt(csvRow.penalty, 10),
                    teamMembers:
                        [
                            csvRow.member1,
                            csvRow.member2,
                            csvRow.member3,

                        ],
                },
            ],
        },
    ];

    return {
        universityFullName: "Ahsanullah University of Science and Technology",
        universityShortName: universityShortName,
        data: data,
    };
}

function manipulateData(parsedData: any) {
    

    const universityData: any = {};

    parsedData.forEach((contestData: any) => {
        const universityShortName = contestData.universityShortName;
        if (universityData[universityShortName]) {
            universityData[universityShortName].data.push(contestData.data[0]);
        } else {
            universityData[universityShortName] = contestData;
        }
    });

    const universities = Object.values(universityData);


    universities.forEach((university: any) => {
        const contestData = university.data;
        const contestTitles = contestData.map((contest: any) => contest.contestTitle);
        const uniqueContestTitles = [...new Set(contestTitles)];

        const uniqueContestData = uniqueContestTitles.map((contestTitle) => {
            const teamData: any = [];
            contestData.forEach((contest: any) => {
                if (contest.contestTitle === contestTitle) {
                    teamData.push(...contest.universityTeams);
                }
            });

            const firstContest = contestData.find((contest: any) => contest.contestTitle === contestTitle);
            firstContest.universityTeams = teamData;
            return firstContest;
        });

        university.data = uniqueContestData;
    });

    return universities;

   
}

export default function readContestData(selectedContestType: string) {
    const [jsonData, setJsonData] = useState<any[]>([]);
    useEffect(() => {
        const fetchCsvData = async () => {
            try {
                const response = await fetch('../../public/contest_data.csv');
                const csvData = await response.text();

                const parsedData = Papa.parse(csvData, {
                    header: true,
                    skipEmptyLines: true,
                    delimiter: ',',
                });

                if (parsedData.errors.length > 0) {
                    console.error('Error parsing CSV:', parsedData.errors);
                } else {
                    const constructedData = parsedData.data.map((row: any) => {
                        if (row.contestType === selectedContestType) {
                            return convertToContestData(row);
                        }
                      });
                    setJsonData(manipulateData(constructedData));
                }
            } catch (error) {
                console.error('Error fetching CSV:', error);
            } finally {
                console.error('Data not fetched');
            }
        };

        fetchCsvData();
    }, []);

    

    return jsonData;
}