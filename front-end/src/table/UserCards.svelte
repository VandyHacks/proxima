<script>
  import { Link } from "svelte-routing";
  import { onMount } from "svelte";
  import mockData from "../mockData.json";

  console.log(mockData);
  onMount(async () => {
    M.AutoInit();
    // TODO: Use fetch api
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
          <td class="name">{name}</td>
          <td class="links">
            <a href={resume_link} target="_blank">
              <i class="material-icons">insert_drive_file</i>
            </a>
          </td>

          <td class="email">
            <a href="mailto:{email}">{email}</a>
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
            <!-- Modal Trigger -->
            <!-- <a class="waves-effect waves-light btn modal-trigger" href="#modal1">
                {application['status']}
                <i class="tiny material-icons">edit</i>
              </a> -->

            <div class="input-field col s12">
              <select>
                <option value="1" selected>{status}</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </select>
            </div>

            <!-- Modal Structure -->
            <div id="modal1" class="modal">
              <div class="modal-content">
                <h4>Modal Header</h4>
                <p>A bunch of text</p>
              </div>
              <div class="modal-footer">
                <a
                  href="#!"
                  class="modal-close waves-effect waves-green btn-flat">
                  Agree
                </a>
              </div>
            </div>
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
