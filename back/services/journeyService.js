import { postgres } from "../deps.js";

const sql = postgres({});

  const getJourney = async (id) => {
    return sql`SELECT * FROM journey WHERE id = ${id}`;
  };
  
  const getJourneys = async () => {
     return await sql`SELECT * FROM journey`;
  };

  export {getJourney, getJourneys};