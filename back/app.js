import {serve} from "./deps.js";
import * as journeyService from "./services/journeyService.js"
import * as stationService from "./services/stationService.js"

const handleGetRoot = async (request) => {
  return new Response("This is the secret backend root :D ...\nnot much to see here though :|\n");
};

const handleGetJourney = async (request, urlPatternResult) => {
  const page = urlPatternResult.pathname.groups.page;
  const stations = await journeyService.getJourney(page);
  if (stations != 0) {
    return Response.json(stations);
}
else {
    return new Response("journey not found", { status: 404 });
}
};

const handleGetJourneys = async (request) => {
  const items = await journeyService.getJourneys();
  return Response.json(items);
};

const handleGetStations = async (request) => {
  const items = await stationService.getStations();
  return Response.json(items);
};

const handleGetStation = async (request, urlPatternResult) => {
  const id = urlPatternResult.pathname.groups.id;
  const stations = await stationService.getStation(id);
  if (stations != 0) {
    return Response.json(stations[0]);
}
else {
    return new Response("Station not found", { status: 404 });
}
};



const urlMapping = [
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/journeys/:page" }),
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

  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/stations/:id" }),
    fn: handleGetStation,
  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/stations" }),
    fn: handleGetStations,
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