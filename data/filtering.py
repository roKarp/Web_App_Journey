import pandas as pd

in_f = 'test.csv'
out_f = 'test2.csv'

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

d = pd.read_csv(in_f)
d['Departure'] = pd.to_datetime(d['Departure'], errors='coerce') #Verifies that the first two columns are DateTime
d['Return'] = pd.to_datetime(d['Return'], errors='coerce')
d = d[pd.notnull(d['Departure'])]
d = d[pd.notnull(d['Return'])]
d = d[d['Departure'] < d['Return']] #Checks that Return is after Departure
print(d)
d = d.rename(columns=mapping)
d = d.drop(columns=remove)
d = d[d['DepartureID'] > 0] #Checks that the id's are valid
d = d[d['ReturnID'] > 0]
d = d[d['Distance'] >= min_dis] #Checks the minimum distance
d['Distance'] = d['Distance'].div(1000)
d = d[d['Duration'] >= min_dur] #Checks the minimum duration
d['Duration'] = d['Duration'].div(60).round(1)
d.to_csv(out_f, index=False)
