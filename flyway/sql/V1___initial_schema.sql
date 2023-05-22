CREATE TABLE journey (
    id SERIAL PRIMARY KEY,
    DepartureID INT NOT NULL,
    DepartureStation TEXT NOT NULL,
    ReturnID INT NOT NULL,
    ReturnStation TEXT NOT NULL,
    Distance FLOAT NOT NULL,
    Duration FLOAT NOT NULL
); 

CREATE TABLE station (
    id INT PRIMARY KEY,
    s_name TEXT NOT NULL,
    start_count INT DEFAULT 0,
    end_count INT DEFAULT 0
); 