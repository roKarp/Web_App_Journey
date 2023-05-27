import pandas as pd

in_f = '<your_csv_file>'
out_f = '<name_your_output_file>'

min_dur = 10
min_dis = 10

mapping = {
    'Departure station id' : 'DepartureID',
    'Departure station name': 'DepartureStation',
    'Return station id': 'ReturnID',
    'Return station name': 'ReturnStation',
    'Covered distance (m)': 'Distance',
    'Duration (sec.)': 'Duration',
}

remove = ['Return', 'Departure']
chunks = 10 ** 8
d = pd.read_csv(in_f, chunksize=chunks) # process
li = []
for dc in d:
    dc['Departure'] = pd.to_datetime(dc['Departure'], errors='coerce') #Verifies that the first two columns are DateTime
    dc['Return'] = pd.to_datetime(dc['Return'], errors='coerce')
    dc = dc[pd.notnull(dc['Departure'])]
    dc = dc[pd.notnull(dc['Return'])]
    dc = dc[dc['Departure'] < dc['Return']] #Checks that Return is after Departure
    dc = dc.rename(columns=mapping)
    dc = dc.drop(columns=remove)
    dc = dc[dc['DepartureID'] > 0] #Checks that the id's are valid
    dc = dc[dc['ReturnID'] > 0]
    dc = dc[dc['Distance'] >= min_dis] #Checks the minimum distance
    dc['Distance'] = dc['Distance'].div(1000)
    dc = dc[dc['Duration'] >= min_dur] #Checks the minimum duration
    dc['Duration'] = dc['Duration'].div(60).round(1)
    li += [dc.copy()]
d = pd.concat(li)
d.to_csv(out_f, index=False)
