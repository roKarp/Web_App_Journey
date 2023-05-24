<script>
  const getStations = async () => {
    const response = await fetch("/api/stations");
    return await response.json();
  };

  let stationsPromise = getStations();

</script>

<a href="/">List of Journeys</a>
<h1>Stations</h1>
{#await stationsPromise}
  <p>Loading all stations</p>
{:then stations}
  {#if stations.length == 0}
    <p>No stations found</p>
  {:else}
    <ol>
        <h3 class="b">Station Name/Address</h3>
      {#each stations as station}
        <li class="a">{station.s_name} <a href="/station?id={station.id}">Info</a>
        </li>
      {/each}
    </ol>
  {/if}
{/await}


<style>


:global(body) {
    background-color: deeporange;
    color: black;
}


h1 {
    text-align: center;
}


h3.b {
    margin-top: 50px;
    margin-bottom: 20px;
    margin-right: 10px;
    margin-left: 10px;
}

li.a {
    margin-right: 10px;
    margin-left: 10px;
}

</style>