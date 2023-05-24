<script>
  const getJourneys = async () => {
    const response = await fetch("/api/journeys");
    return await response.json();
  };

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
  <div class="grid-container">
    <ol>
        <h3 class="b">Departure Station</h3>
      {#each journeys as journey}
        <li class="a">{journey.departurestation}  
        </li>
        <hr>
      {/each}
    </ol>

    <ol style="list-style-type: none">
        <h3 class="b">Return Station</h3>
      {#each journeys as journey}
        <li class="a">{journey.returnstation}  
        </li>
        <hr>
      {/each}
    </ol>

    <ol style="list-style-type: none">
        <h3 class="b">Distance (km)</h3>
      {#each journeys as journey}
        <li class="b">{journey.distance}  
        </li>
        <hr>
      {/each}
    </ol>

    <ol style="list-style-type: none">
        <h3 class="b">Duration (min)</h3>
      {#each journeys as journey}
        <li class="b">{journey.duration}  
        </li>
        <hr>
      {/each}
    </ol>

  </div>
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

</style>