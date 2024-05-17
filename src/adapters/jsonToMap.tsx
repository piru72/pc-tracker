
function extractTeamMembersNames(data: any) {

    let teamMembersNamesMap: Map<string, number> = new Map();
    if (data) {
        let size = data.length;
        //console.log(size);
        for (let i = 0; i < size; i += 1) {
           // console.log(data[i].universityTeams);
            if (data[i].universityTeams) {
                let teamCount = data[i].universityTeams.length;
                for (let j = 0; j < teamCount; j += 1) {

                    if (data[i].universityTeams[j]) {
                        if (data[i].universityTeams[j].teamMembers) {
                           // console.log(data[i].universityTeams[j].teamMembers);
                            for (let k = 0; k < 3; k += 1) {
                                //console.log(data[i].universityTeams[j].teamMembers[k]);
                                let name: string = data[i].universityTeams[j].teamMembers[k];
                                name = name.toUpperCase();
                                if (teamMembersNamesMap.has(name)) {
                                    const count = teamMembersNamesMap.get(name)!;
                                    teamMembersNamesMap.set(name, count + 1);
                                } else {

                                    teamMembersNamesMap.set(name, 1);
                                }
                            }
                        }

                    }

                }

            }
        }
    }
    return teamMembersNamesMap;
}

function getFinalData(data: any) {
    let austData = data.filter((university: { universityShortName: string; }) => university.universityShortName === 'AUST')
    let austDataMap = austData.map((university: { data: any; }) => university.data)
    let sortedData = [...austDataMap].sort((a, b) => {
        return new Date(a.contestDate).getTime() - new Date(b.contestDate).getTime();
    });
    let reversedData = sortedData.reverse();
    let finalData = reversedData[0];
    return extractTeamMembersNames(finalData);
}

function mergeMap(map1: Map<string, number>, map2: Map<string, number>, map3: Map<string, number>) {
    let allStat = new Map<string, number>();

    map1.forEach((value, key) => {
        if (allStat.has(key)) {
            allStat.set(key, allStat.get(key)! + value);
        } else {
            allStat.set(key, value);
        }
    });

    map2.forEach((value, key) => {
        if (allStat.has(key)) {
            allStat.set(key, allStat.get(key)! + value);
        } else {
            allStat.set(key, value);
        }
    });

    map3.forEach((value, key) => {
        if (allStat.has(key)) {
            allStat.set(key, allStat.get(key)! + value);
        } else {
            allStat.set(key, value);
        }
    });

    allStat = new Map([...allStat.entries()].sort((a, b) => b[1] - a[1]));

    return allStat;
}

export { getFinalData , mergeMap}