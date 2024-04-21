
from collections import defaultdict

import pandas as pd
from Contest_Details import (CONTEST_DATE, CONTEST_NAME, CONTEST_PLATFORM,
                             CONTEST_URL)
from HTML_Parser import (get_full_name, get_short_name, penalty_list, rankings, solved_list,
                         team_names, universities)

# Creating a dictionary to store the values
standings_list = []
for ranking, team_name, university, solved, penalty in zip(rankings, team_names, universities, solved_list, penalty_list):
    standings_list.append({
        'universityFullName': university,
        'universityShortName': get_short_name(university),
        'contestTitle': CONTEST_NAME,
        'contestDate': CONTEST_DATE,
        'platform': CONTEST_PLATFORM,
        'standingLink': CONTEST_URL,
        'totalParticipatingTeam': len(standings_list),
        'rank': ranking,
        'totalSolved': solved,
        'penalty': penalty,
        'teamName': team_name,
        'teamMembers': ['N/A', 'N/A', 'N/A'],

    })

# Creating a dictionary to store the values
data = {'universityTeams': standings_list}

# Creating a dataframe
contest_details = {
    'data': data
}

df = pd.DataFrame(contest_details)
# Dictionary to store contest data for each university
university_contest_data = defaultdict(list)

# Group contest data by university
for contest in standings_list:

    university_short_name = contest['universityShortName']
    # Remove unnecessary keys
    contest_data = {
        'rank': int(contest['rank']),
        'totalSolved': int(contest['totalSolved']),
        'penalty': int(contest['penalty']),
        'teamName': contest['teamName'],
        'teamMembers': contest['teamMembers'],
    }

    # Append contest data to the respective university's list
    university_contest_data[university_short_name].append(contest_data)

# Convert the dictionary to the desired format
formatted_contest_data = [{

    'universityShortName': university_short_name,
    'universityFullName': get_full_name(university_short_name),

    'data': [{
        'contestTitle': CONTEST_NAME,
        'contestDate': CONTEST_DATE,
        'standingLink': CONTEST_URL,
        'totalParticipatingTeam': len(penalty_list),
        'universityTeams': university_contest_data[university_short_name]
    }]
} for university_short_name in university_contest_data]

# Create DataFrame from the formatted contest data
df = pd.DataFrame(formatted_contest_data)

import os.path

# Check if the file exists
if os.path.exists('IUPC_DATA.json'):
    # If the file exists, load its content
    existing_data = pd.read_json('IUPC_DATA.json', orient='records')

    print(existing_data)

    print("\n\n\nNew Data:")
    print(df)
    # Now go to each data of existing_data 
    # and append the df.datas data to existing_data datas

    
    for i in range(len(existing_data)):
        for j in range(len(df)):
            if existing_data.iloc[i]['universityShortName'] == df.iloc[j]['universityShortName']:
                # print("Matched")
                # print(existing_data.iloc[i]['data'])
                # print(df.iloc[j]['data'])
                # existing_data.iloc[i]['data'] = existing_data.iloc[i]['data'].append(df.iloc[j]['data'])
                existing_data.iloc[i]['data'].append(df.iloc[j]['data'][0])

                # print ("After appending")
                # print(existing_data.iloc[i]['data'])
                # print("\n\n\n")
                break
    
    # Append or merge the new data with the existing data
    updated_data = existing_data
    # If you want to merge based on certain columns, you can use pd.merge()
    # updated_data = pd.merge(existing_data, df, on='universityShortName', how='outer')

    # Export the updated DataFrame to JSON
    updated_data.to_json('IUPC_DATA.json', orient='records', index=False)
else:
    # If the file doesn't exist, simply export the DataFrame to JSON
    df.to_json('IUPC_DATA.json', orient='records', index=False)

