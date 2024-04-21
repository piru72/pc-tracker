import re

import requests
from bs4 import BeautifulSoup
from Contest_Details import CONTEST_URL
from University_Names import universityNames


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


def get_short_name(full_name):
    return universityNames.get(full_name, 'N/A')


def get_full_name(short_name):
    for full_name, short in universityNames.items():
        if short == short_name:
            return full_name
    return 'N/A'


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
