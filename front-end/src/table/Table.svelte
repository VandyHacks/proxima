<script>
import { onMount } from "svelte";
import List from "list.js";
import Row from "./Row.svelte"



onMount(async () => {
  // Materialize initialization
  M.AutoInit();

  // Search functionality
  const options = {
    valueNames: ["name", "email", "committees"]
  };
  const userList = new List("users", options);
});

let applications;
const loadApplicaitons = (async() => {
  // Fetch data from back-end
  applications = await fetch('http://localhost:7777/applications');

})();

</script>

<style>
  table {
    width: 80%;
  }
  .users {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }

  #search {
    width: 80%;
  }

  tr.column-names > th {
  text-align: center;
  }
  

  .search {
    width: 30%;
    display: flex;
    flex-direction: column;
  }
  button {
    margin-bottom: 10px;
  }
  
</style>


  

<!-- Trying the table idea -->
<div class="users">
  <div id="search">
    <div>
      <input class="search" placeholder="Search By Name" />
    </div>
    <div class="buttonWrapper">
      <button class="sort btn waves-effect waves-light" data-sort="name">
        Sort By Name
      </button>
    </div>
  </div>

  <table class="striped responsive-table">
    <thead>
      <tr class="column-names">
        <th>Applicant Name</th>
        <th>Resume</th>
        <th>Email</th>
        <th>Year</th>
        <th>Committees</th>
        <th>Interview Form</th>
        <th>Application Notes</th>
        <th>Status</th>
      </tr>
    </thead>
    <!-- svelte for each -->

  {#await loadApplicaitons} 
  <h3>Loading Applicaitons</h3>
  {:then data}
    <tbody class="list" id="candidates">
      {#each applications as application }
        <Row application={application}/>
      {/each}
    </tbody>
  {:catch error}
  	<h3>An error occurred! {error}</h3>
  {/await}

  </table>
</div>

