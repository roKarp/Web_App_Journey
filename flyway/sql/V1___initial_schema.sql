CREATE TABLE journey (
    id SERIAL PRIMARY KEY,
    DepartureID INT NOT NULL,
    DepartureStation TEXT NOT NULL,
    ReturnID INT NOT NULL,
    ReturnStation TEXT NOT NULL,
    Distance INT NOT NULL,
    Duration INT NOT NULL
); 