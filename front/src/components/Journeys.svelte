<script>
  export let page;
  let p = parseInt(page);
  let offset = (p - 1) * 20;

  let path = "/api/journeys/" + offset.toString();
  const getJourneys = async () => {
    const response = await fetch(path);
    return await response.json();
  };
  let journeysPromise = getJourneys();
</script>

<ul>
  <li><a href="/journeys">List of Journeys (first page)</a></li>
  <li><a href="/stations">List of Stations</a></li>
</ul>
<h1>Journeys</h1>
{#await journeysPromise}
  <p>Loading all journeys</p>
{:then journeys}
  {#if journeys.length == 0}
    <p>No journeys recorded</p>
  {:else if Number.isInteger(p)}
    {#if p != 1}
      <p class="a"><a href="/journeys?page={p - 1}">Last page</a></p>
    {/if}
    {#if journeys.length / 21 == 1}
      <p class="b"><a href="/journeys?page={p + 1}">Next page</a></p>
    {/if}
    <div class="grid-container">
      <ol style="list-style-type: none">
        <h3 class="b">Departure Station</h3>
        {#each journeys as journey, i}
          {#if i != 20}
            <li class="a">{journey.id}: {journey.departurestation}</li>
            <hr />
          {/if}
        {/each}
      </ol>

      <ol style="list-style-type: none">
        <h3 class="b">Return Station</h3>
        {#each journeys as journey, i}
          {#if i != 20}
            <li class="a">{journey.returnstation}</li>
            <hr />
          {/if}
        {/each}
      </ol>

      <ol style="list-style-type: none">
        <h3 class="b">Distance (km)</h3>
        {#each journeys as journey, i}
          {#if i != 20}
            <li class="b">{journey.distance}</li>
            <hr />
          {/if}
        {/each}
      </ol>

      <ol style="list-style-type: none">
        <h3 class="b">Duration (min)</h3>
        {#each journeys as journey, i}
          {#if i != 20}
            <li class="b">{journey.duration}</li>
            <hr />
          {/if}
        {/each}
      </ol>
    </div>
  {:else}
    <p>{journey[0].error}</p>
    <p />{/if}
{:catch error}
  <p>Invalid page parameter</p>
{/await}

<style>
  :global(body) {
    background-color: azure;
    color: black;
  }
  .grid-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    padding: 10px;
  }

  h1 {
    text-align: center;
  }

  h3.a {
    margin-top: 50px;
    margin-bottom: 20px;
    margin-right: 50px;
    margin-left: 50px;
  }

  h3.b {
    margin-top: 50px;
    margin-bottom: 20px;
    margin-right: 10px;
    margin-left: 10px;
  }

  li.b {
    margin-right: 20px;
    margin-left: 20px;
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
