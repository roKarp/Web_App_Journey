<script>
  export let page;
  const getStations = async () => {
    const response = await fetch("/api/stations");
    return await response.json();
  };
  let p = parseInt(page);
  let stationsPromise = getStations();
</script>

<ul>
  <li><a href="/journeys">List of Journeys (first page)</a></li>
  <li><a href="/stations">List of Stations (first page)</a></li>
</ul>
<h1>Stations</h1>
{#await stationsPromise}
  <p>Loading all stations</p>
{:then stations}
  {#if stations.length == 0}
    <p>No stations found</p>
  {:else}
  {#if Number.isInteger(p)}
  {#if Math.ceil(stations.length /20) < p}
  <p>The accessed page has no more values</p>
  <p>Go back to the <a href="/stations?page=1">start</a></p>
  {/if}
  {#if p!= 1}
  <p class="a"><a href="/stations?page={p - 1}">Previous page</a></p>
  {/if}
  {#if Math.ceil(stations.length / 20) >= p  + 1}
    <p class="b"><a href="/stations?page={p + 1}">Next page</a></p>
  {/if}
    <ul>
      <h3 class="b">Station Name/Address</h3>
      {#each stations as station, i}
      {#if i < p*20 && i >=0 + 20*(p - 1)}
        <li class="a">
          {station.s_name} <a href="/station?id={station.id}">Info</a>
        </li>
      {/if}
      {/each}
    </ul>
    {/if}
  {/if}
{/await}

<style>
  :global(body) {
    background-color: rgb(199, 106, 18);
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
  p.a {
    text-align: left;
  }
  p.b {
    text-align: right;
  }
</style>
