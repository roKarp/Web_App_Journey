import {serve} from "./deps.js";
//import { postgres } from "./deps.js";
import * as journeyService from "./services/journeyService.js"
//const sql = postgres({});

const handleGetRoot = async (request) => {
  return new Response("This is the root...\nnot much to see here :|\n");
};

const handleGetJourney = async (request, urlPatternResult) => {
  const id = urlPatternResult.pathname.groups.id;
  const stations = await journeyService.getJourney(id);
  if (stations != 0) {
    return Response.json(stations[0]);
}
else {
    return new Response("journey not found", { status: 404 });
}
};

const handleGetJourneys = async (request) => {
  const items = await journeyService.getJourneys();
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

serve(handleRequest, {port: 7777});