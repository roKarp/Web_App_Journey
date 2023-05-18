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
d = d.rename(columns=mapping)
d = d.drop(columns=remove)
d = d[d['Distance'] >= min_dis]
d = d[d['Duration'] >= min_dur]

d.to_csv(out_f, index=False)
