<script>
  import { Link } from "svelte-routing";
  import { onMount } from "svelte";
  import mockData from "../mockData.json";
  import List from "list.js";


  onMount(async () => {
    M.AutoInit();
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
      {#each mockData as { id, director, name, resume_link, email, year, committees, status } (id)}
        <tr class="rows {director || ''}">
          <td class="name">
            {name}
          </td>

          <td class="links">
            <a href={resume_link} target="_blank">
              <i class="material-icons">insert_drive_file</i>
            </a>
          </td>

          <td class="email">
            <a href="mailto:{email}">
            {email}
            </a>
          </td>

          <td class="year">{year.replace(/^./, year[0].toUpperCase())}</td>

          <td class="committees">
            {#each committees as committee}
              <div class="chip">
                {committee.replace(/^./, committee[0].toUpperCase())}
              </div>
            {/each}
          </td>

          <td>
            <Link to="/notes/:{id}">
              <button class="sort btn blue waves-effect waves-light padding">
                Interview
              </button>
            </Link>
          </td>

          <td>
            <b>
              <Link to="/interview/:{id}">View</Link>
            </b>
          </td>

          <td class="status">
             <!-- Dropdown Trigger -->
            <a class='dropdown-trigger btn' href='#' data-target='dropdown{id}'>
              {status}
              <i class="tiny material-icons">edit</i>
            </a>
            <!-- Dropdown Structure -->
            <ul id='dropdown{id}' class='dropdown-content'>
              <li><a href="#!">Accepted</a></li>
              <li><a href="#!">Rejected</a></li>
              <li><a href="#!">Interview</a></li>
            </ul>
            
          </td>
        </tr>
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
