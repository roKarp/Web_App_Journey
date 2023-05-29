# Web Application for city bike journeys

This README file contains the instructions for setting up this fantastical web application.

This web app uses the "walking skeleton" basic structure, which can be found here: https://github.com/avihavai/wsd-walking-skeleton

Basics of how it works can be found there, but it has been changed from its initial structure.

## Basic information

The basic functionality of the application works as instructed within the Solitas Dev Academy assignment https://github.com/solita/dev-academy-2023-exercise.

This web application uses a docker based backend for all the database commands, and an Astro + Svelte frontend. Once the application is up and running in docker, it can be accessed from the url:
 ```
 localhost:7800/
 ```
 Other pages that you can access either from the root or by typing to the browser:
 
- Journey list view with pagination: `localhost:7800/journeys`
- Station list view with pagination: `localhost:7800/stations`
- A singular station view for each station: `localhost:7800/station?id=<station_id>`
  - Station name/address
  - Number of times the station is departed from 
  - Number of times the station is arrived at


## Prerequisites
- [Docker Desktop](https://docs.docker.com/desktop/install/ubuntu/) 
- [Python](https://www.python.org/downloads/) + [pandas](https://pandas.pydata.org/docs/getting_started/install.html)
- Linux (I use [Ubuntu](https://ubuntu.com/wsl) with WSL)
- [Curl](https://everything.curl.dev/get/linux), for optional local backend testing

## Setup instructions 

  ### Step 1
  Get the directory from this git address 
  ```
  https://github.com/roKarp/Web_App_Journey.git
  ```

  ### Step 2
  Input the importable .csv file into /data/<your-csv>. Make sure that it is structuraly similar to this 
  
  
  
  > Departure,Return,Departure station id,Departure station name,Return station id,Return station name,Covered distance (m),Duration (sec.)
  
  Where each of their corresponding data types are:
  > [DateTime],[DateTime],[Int],[String],[Int],[String],[Int],[Int]

  
  (see the example file `test.csv` in the folder /data)
  
This repo contains a smaller test file [test.csv](https://github.com/roKarp/Web_App_Journey/blob/main/data/test.csv), and a filtered version of it [test2.csv](https://github.com/roKarp/Web_App_Journey/blob/main/data/test2.csv), but you can download a larger one from:
- https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv
- https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv
- https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv

Open `filtering.py` in the **data** folder and change the `in_f = <your-csv>`. If you have python and panda installed, then just run
 ```
  python filtering.py
 ```
  You should now have a filtered .csv file, called **filtering.csv**, ready for importing.

  ### Step 3
  Open the main directory, where docker-compose.yml is located, launch 
 ```
  docker compose up
```
  Wait for the containers to be built. Depending on your set up it might take some time.
Once the containers have been created, open a separate terminal, within the same directory, and type into the terminal:
```
  docker cp data/filtering.csv database-server:/var/lib/postgresql/data
```
This copies the filtered .csv into the *database* container, where it will be used for importing. 
Next, type into the newest terminal:
```
  docker exec -it database-server psql -U username database
```

This opens the `psql` console, where we will import the data to the table `journey`.
Type to the `psql` console:
```
  \copy journey (DepartureID, DepartureStation,  ReturnID, ReturnStation, Distance, Duration) FROM '/var/lib/postgresql/data/filtering.csv' DELIMITER ',' CSV HEADER;
```

If everything went according to plan, you should be able to see:
`COPY <some amount of numbers>`

In order to add into the `station` table, use the following commands:
 ``` 
INSERT INTO station (id, s_name) SELECT DISTINCT DepartureID, DepartureStation FROM journey;

INSERT INTO station (id, s_name) SELECT DISTINCT r.ReturnID, r.ReturnStation FROM journey r WHERE r.ReturnID NOT IN (SELECT id FROM station);
```
Now just exit the psql console by: `\q`

  And the web application is now ready to be used!
  
## Testing

  ### Backend
If you want to test how the backend now works in it's current state, type into the terminal: 
```
curl "localhost:7800/api/stations"
```
  (This does require curl to be installed)

  This should output every stations that was imported to the table 'station'
  
There are a few bash scripts in the **testing** folder, which you also use Curl to get data from the backend database. For example, typing `./journeys` inside the folder should initate the first page (20 journeys) from the database.
  
  ### Frontend
In case you want to play around the frontend, open a browser (I like to use FireFox :D) and a tab with `localhost:7800`. This should open the root page of the application which navigates you to either the `stations` page or `journeys` page. The webpage also has an error 404 page within it, where you get transfered to if you decide to open a page that doesn't exist. 
  

Go ahead and give it a try :)
