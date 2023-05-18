import { postgres } from "./deps.js";

const sql = postgres({});

const handleGetRoot = async (request) => {
  return new Response("This is the root...\nnot much to see here :|\n");
};

const handleGetJourney = async (request, urlPatternResult) => {
  const id = urlPatternResult.pathname.groups.id;
  const stations = await sql`SELECT * FROM journey WHERE id = ${id}`;

  return Response.json(stations[0]);
};

const handleGetJourneys = async (request) => {
  const items = await sql`SELECT * FROM journey`;
  return Response.json(items);
};


const urlMapping = [
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/journeys/:id" }),
    fn: handleGetJourney,
  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/journeys" }),
    fn: handleGetJourneys,
  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/" }),
    fn: handleGetRoot,
  },
];

const handleRequest = async (request) => {
  const mapping = urlMapping.find(
    (um) => um.method === request.method && um.pattern.test(request.url)
  );

  if (!mapping) {
    return new Response("Not found", { status: 404 });
  }

  const mappingResult = mapping.pattern.exec(request.url);
  return await mapping.fn(request, mappingResult);
};

const portConfig = { port: 7777, hostname: '0.0.0.0' };
Deno.serve(portConfig, handleRequest);