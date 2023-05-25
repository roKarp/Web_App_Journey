import { postgres } from "../deps.js";

const sql = postgres({});

const getJourney = async (page) => {
  return sql`SELECT * FROM journey 
    ORDER BY id
    LIMIT 21
    OFFSET ${page}`;
};

const getJourneys = async () => {
  return await sql`SELECT * FROM journey`;
};

export { getJourney, getJourneys };
