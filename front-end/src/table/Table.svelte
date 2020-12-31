<script>
  import { onMount } from "svelte";
  import List from "list.js";
  import Row from "./Row.svelte"

  import applications from "../mockData/applications.json";

  onMount(async () => {
    // Materialize initialization
    M.AutoInit();

    // Fetch data from back-end


    // Search functionality
    const options = {
      valueNames: ["name", "email", "committees"]
    };
    const userList = new List("users", options);
  });

  const moveUser = () => {

  }
  


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

  .users h5 {

  }

  #search {
    width: 80%;
  }

  tr.column-names > th {
  text-align: center;
  }
  

  .search {
    /* background-color: green;  */
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
  <h5>Current Applicants</h5>
  <div id="search">
    <div>
      <input class="search" placeholder="Search By Name" />
    </div>
    <div class="buttonWrapper">
      <button class="sort btn waves-effect waves-light" data-sort="name">
        Sort By Name
      </button>
      <!-- <button class="sort btn waves-effect waves-light" data-sort="accept">
        Sort By Interview Status
      </button>
      <button class="sort btn waves-effect waves-light" data-sort="interview">
        Sort By Acceptance Status
      </button> -->
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

    <tbody class="list" id="candidates">
      {#each applications as application }
        <Row application={application}/>
      {/each}
    </tbody>
  </table>
</div>


<div class="users">
  <h5>Reject Applicants</h5>
  <table>
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
    <tbody class="list" id="finalized">
      {#each applications as application }
        {#if application.status === "rejected"}
          <Row application={application}/>
        {/if}
      {/each}
    </tbody>
  </table>
</div>
