import { postgres } from "../deps.js";

const sql = postgres({});

const getStation = async (id) => {
  return sql` SELECT s.s_name,
                (SELECT COUNT(*) FROM journey WHERE departureid=s.id) AS departures,
                (SELECT COUNT(*) FROM journey WHERE returnid=s.id) AS returns
              FROM station s WHERE s.id = ${id};`;
};

const getStations = async () => {
  return await sql`SELECT * FROM station`;
};

export { getStation, getStations };
