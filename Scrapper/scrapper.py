import requests
import pandas as pd
import re
from bs4 import BeautifulSoup


# Contest details
CONTEST_NAME = 'CUET Inter University Codestorm 1.0'
CONTEST_URL = 'https://toph.co/c/cuet-inter-university-codestorm-1-0/standings'
CONTEST_DATE = '2024-01-26'
CONTEST_PLATFORM = 'Toph'




def get_ranking(row):
    value = row.find('td', class_='text-center', width='32').text
    ranking = ''
    for i in value:
        if i.isnumeric():
            ranking += i
        else:
            break
    return ranking

def get_team_name(detailsCol):
    return detailsCol.contents[0].text

def get_university(detailsCol):
    return detailsCol.find('div', class_="adjunct").text

def get_solved(verdictCol):
    return verdictCol.find('strong').text

def get_penalty(verdictCol):
    div_adjunct = verdictCol.find('div', class_='adjunct')
    if div_adjunct:
        tippy_content_value = div_adjunct.get('title')
        numeric_value = re.search(r'\d+', tippy_content_value)
        if numeric_value:
            return numeric_value.group(0)
    return 'DUMMY'


data = requests.get(CONTEST_URL).text
# Parsing the html content
soup = BeautifulSoup(data, 'html.parser')

# Finding the tables
print('Classes of each table:')
for table in soup.find_all('table'):
    print(table.get('class'))

# Finding the table
table = soup.find('table', class_='table -standings -emphasis')

# List to store values
rankings = []
team_names = []
universities = []
solved_list = []
penalty_list = []

# Extracting values from the table
for row in table.find_all('tr'):

    ranking = 'DUMMY'
    teamName = 'DUMMY'
    university = 'DUMMY'
    solved = 'DUMMY'
    penalty = 'DUMMY'

    ranking = get_ranking(row)

    detailsCol = row.find('td', class_=False)
    teamName = get_team_name(detailsCol)
    university = get_university(detailsCol)
    # Check if the team is from IOI
    if 'IOI' in teamName:
        university = 'IOI'
    # Check if the team is already in the list
    if teamName in team_names:
        continue
    
    
    verdictCol = row.find('td', class_='primary')
    solved = get_solved(verdictCol)
    penalty = get_penalty(verdictCol)

    # Append values to lists
    rankings.append(ranking)
    team_names.append(teamName)
    universities.append(university)
    solved_list.append(solved)
    penalty_list.append(penalty)


# Creating a dictionary to store the values
standings_list = []
for ranking, team_name, university, solved, penalty in zip(rankings, team_names, universities, solved_list, penalty_list):
    standings_list.append({
        'Ranking': ranking,
        'Team Name': team_name,
        'University': university,
        'Solved': solved,
        'Penalty': penalty
    })

# Creating a dictionary to store the values
data = {'Standings': standings_list}

# Creating a dataframe
contest_details = {
    'name': CONTEST_NAME,
    'date': CONTEST_DATE,
    'platform': CONTEST_PLATFORM,
    'url': CONTEST_URL,
    'standings': data
}

df = pd.DataFrame(contest_details)
df.to_json('contest_details.json', orient='records')

