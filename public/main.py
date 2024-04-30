import csv
import json

import json
# is used to parse json files to csv 

with open('iupc.json', 'r') as json_file:
    icpc_data = json.load(json_file)


print(icpc_data)



headers = ["universityShortName", "contestType", "contestTitle", "contestDate", "standingLink", "totalParticipatingTeam", "rank", "teamName", "totalSolved", "penalty", "member1", "member2", "member3"]

with open('iupc_data.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    # Write headers to the CSV file
    writer.writerow(headers)

    # Iterate over each contest in the data
    for contest in icpc_data:
        university_short_name = contest['universityShortName']
        
        # Iterate over each contest entry
        for entry in contest['data']:
            contest_type = "IUPC"
            contest_title = entry['contestTitle']
            contest_date = entry['contestDate']
            standing_link = entry['standingLink']
            total_participating_team = entry['totalParticipatingTeam']
            
            # Iterate over each team in the contest entry
            for team in entry['universityTeams']:
                rank = team['rank']
                team_name = team['teamName']
                total_solved = team['totalSolved']
                penalty = team['penalty']
                members = team['teamMembers']
                
                # Pad members list to ensure there are three members
                members.extend([''] * (3 - len(members)))
                
                # Write data to CSV file
                writer.writerow([university_short_name, contest_type, contest_title, contest_date, standing_link, total_participating_team, rank, team_name, total_solved, penalty] + members)
