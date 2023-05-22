import { postgres } from "../deps.js";

const sql = postgres({});

  const getStation = async (id) => {
    return sql`SELECT s.s_name, 
      COUNT(d.DepartureID) AS departures, 
      COUNT(r.DepartureID) AS returns 
    FROM station s 
    LEFT JOIN journey d 
    ON d.DepartureID = s.id 
    LEFT JOIN journey r 
    ON r.ReturnID = s.id 
    WHERE s.id = ${id} 
    GROUP BY s.s_name;`;
  };
  
  const getStations = async () => {
     return await sql`SELECT * FROM station`;
  };


  export {getStation, getStations};