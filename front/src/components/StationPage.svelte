<script>
  export let id;
  const path = "/api/stations/" + id;

  const getStation = async () => {
    const response = await fetch(path);
    return await response.json();
  };

  let stationsPromise = getStation();
</script>

<main>
  <ul>
    <li><a href="/journeys">List of Journeys (first page)</a></li>
    <li><a href="/stations">List of Stations (first page)</a></li>
  </ul>
  {#await stationsPromise}
    <p>Loading station information</p>
  {:then station}
    {#if station.length == 0}
      <p>No station found with that id</p>
    {:else}
      <h1>{station.s_name}</h1>
      <p>Departure amount: {station.departures}</p>
      <p>Arrival amount: {station.returns}</p>
    {/if}
  {:catch error}
    <p>Invalid id parameter</p>
  {/await}
</main>
