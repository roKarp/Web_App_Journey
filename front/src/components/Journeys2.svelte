<script>
  const getJourneys = async () => {
    const response = await fetch("/api/journeys");
    return await response.json();
  };
  export let page;
  let p = parseInt(page);
  let journeysPromise = getJourneys();

</script>

<a href="/stations">List of Stations</a>
<h1>Journeys</h1>
{#await journeysPromise}
  <p>Loading all journeys</p>
{:then journeys}
  {#if journeys.length == 0}
    <p>No journeys recorded</p>
  {:else}
  {#if Number.isInteger(p)}
  {#if Math.ceil(journeys.length / 10) < p}
    <p>The accessed page has no more values</p>
    {:else}
    {#if p != 1}
    <p class="a"><a href="/journeys?page={p - 1}">Last page</a></p>
    {/if}
    {#if Math.ceil(journeys.length / 10) >= p + 1}
    <p class="b"><a href="/journeys?page={p + 1}">Next page</a></p>
    {/if}
  <div class="grid-container">
    <ol style="list-style-type: none">
        <h3 class="b">Departure Station</h3>
      {#each journeys as journey, i}
      {#if i < p*10 && i >=0 + 10*(p - 1)}
        <li class="a">{journey.id}: {journey.departurestation}  
        </li>
        <hr>
      {/if}
      {/each}
    </ol>

    <ol style="list-style-type: none">
        <h3 class="b">Return Station</h3>
      {#each journeys as journey, i}
      {#if i < p*10 && i >=0 + 10*(p - 1)}
        <li class="a">{journey.returnstation}  
        </li>
        <hr>
      {/if}
      {/each}
    </ol>

    <ol style="list-style-type: none">
        <h3 class="b">Distance (km)</h3>
      {#each journeys as journey, i}
      {#if i < p*10 && i >=0 + 10*(p - 1)}
        <li class="b">{journey.distance}  
        </li>
        <hr>
      {/if}
      {/each}
    </ol>

    <ol style="list-style-type: none">
        <h3 class="b">Duration (min)</h3>
      {#each journeys as journey, i}
      {#if i < p*10 && i >=0 + 10*(p - 1)}
        <li class="b">{journey.duration}  
        </li>
        <hr>
      {/if}
      {/each}
    </ol>

  </div>
  {/if}
  {:else}
  <p>the page parameter was incorrect<p>
  {/if}
  {/if}
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