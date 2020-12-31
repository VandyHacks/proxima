<script>
  import { onMount } from "svelte";
  import List from "list.js";
  import Row from "./Row.svelte"

  import applications from "../mockData/applications.json";

  onMount(async () => {
    // Materialize initialization
    M.AutoInit();

    // Search functionality
    let options = {
      valueNames: ["name", "accept", "interview"]
    };
    let userList = new List("users", options);
  });

  



</script>

<style>
  .padding {
    margin-top: 10px;
  }
  table {
    width: 80%;
  }
  #users {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  #search {
    width: 80%;
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
  tr.rows > td,
  tr.column-names > th {
    text-align: center;
  }

  tr.director {
    border-left: 3px solid #2196f3;
  }

  tr.rejected {
    border-left: 3px solid red;
  }

  td.links > a {
    color: #2196f3;
  }

  td.links > a > i {
    width: 100%;
  }

  i.tiny {
    font-size: 0.7rem;
  }
</style>

<center>
  <h5>Current Applicants</h5>
</center>
<!-- Trying the table idea -->
<div id="users" class="">
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

<center>
  <h5>Reject Applicants</h5>
</center>

<div id="users">
  <table>
    <thead>
      <tr class="column-names">
        <th>Applicant Name</th>
        <th>Email</th>
        <th>Year</th>
        <th>Committees</th>
        <th>Notes</th>
        <th>Interview Form</th>
        <th>Status</th>
        <th>Links</th>
      </tr>
    </thead>
    <tbody id="rejects" />
  </table>
</div>
