This README file contains the instructions for setting up this fantastical web application, which uses Docker as a backend.

This application uses the "walking skeleton" basic structure, which can be found here: https://github.com/avihavai/wsd-walking-skeleton
Basics of how it works can be found there, but it has been changed from its initial structure. (Still to be improved)

Prerequisites: Docker Desktop, Python and pandas, Linux (I use Ubuntu with WSL) (to be updated)

First: get the directory from this git address

Second: input the importable .csv file into /data/<your-csv>. Make sure that it is structuraly similar to this https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv
This repo contains one such larger file and a test file, which is smaller. 
Open filtering.py and change the "in_f = '<your-csv>'. If you have python and panda installed and run filtering.py, you should now have a filtered .csv file ready for importing.

Third: Open the main directory, where docker-compose.yml is located, launch 'docker compose up' and wait for the containers to be built. Depending on your set up it might take some time.
Once the containers have been created, exit the program (Ctrl+C) and type into the terminal:
docker cp /data/test2.csv database-server:/var/lib/postgresql/data
This copies the filtered .csv into the 'database' container, where it will be used for importing. 

Next, open a separate terminal in the same directory. Launch the application (docker compose up) and wait for it to be up and running.
Once it is type into the other terminal:
docker exec -it database-server psql -U username database

This opens the psql console, where we will import the data to the table 'journey'.
Type to the psql console:
\copy journey (DepartureID, ReturnID, DepartureStation, ReturnStation, Distance, Duration) FROM '/var/lib/postgresql/data/test2.csv' DELIMITER ',' CSV HEADER;

If everything went according to plan, you should be able to see:
COPY <some amount of numbers>

From my initial testing, this worked for the data importing.
If you want to test if it works in it's current state, exit the psql console (\q) and type:
curl "localhost:7777/journeys"
This should output every journey that was imported to the table 'journey'

To be continued...