<script>
  import { Link } from "svelte-routing";
  import { onMount } from "svelte";
  import List from "list.js";
  import mockData from "../mockData.json";
  onMount(async () => {
    var options = {
      valueNames: ["name", "accept", "interview"]
    };
    var userList = new List("users", options);
    console.log;
  });
  function shouldInterview(name) {
    let ele;
    for (ele of mockData) {
      if (ele["name"] == name) {
        // update if we should interview:
        ele["shouldInterview"] = "yes";
      }
    }
    returnState();
  }
  function shouldNotInterview(name) {
    let ele;
    for (ele of mockData) {
      if (ele["name"] == name) {
        // update if we should interview:
        ele["shouldInterview"] = "no";
      }
    }
    returnState();
  }
  function unevaluated(name) {
    let ele;
    for (ele of mockData) {
      if (ele["name"] == name) {
        // update if we should interview:
        ele["shouldInterview"] = "unsure";
      }
    }
    returnState();
  }
  function accept(name) {
    let ele;
    for (ele of mockData) {
      if (ele["name"] == name) {
        // update if we should interview:
        ele["status"] = "accept";
      }
    }
    returnState();
  }
  function reject(event, name) {
    console.log(event); 

    // our tables are structured similarly: 
    let domElement = ((event['target']).parentElement.parentElement.parentElement.parentElement); 
    // let domElement = document.getElementById(;) 
    domElement.remove(); 
    updateRejectTable(domElement); 

    //update the backend. 

    let ele;
    for (ele of mockData) {
      if (ele["name"] == name) {
        // update if we should interview:
        ele["status"] = "reject";
      }
    }
    returnState();
  }
  function unsure(name) {
    let ele;
    for (ele of mockData) {
      if (ele["name"] == name) {
        // update if we should interview:
        ele["status"] = "unsure";
      }
    }
    returnState();
  }
  function returnState() {
    console.log(mockData);
  }
  function passName(name) {
    localStorage.setItem("curName", name);
    console.log(localStorage.getItem("curName"));
  }
  // returnState();

  function updateRejectTable(domEle) {
    console.log(domEle); 
    document.getElementById('rejects').append(domEle); 
  }
</script>

<style>
  * {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
  }
  .padding {
    margin-top: 10px;
  }
  table {
    width: 80%;
    /* text-align: center; */
  }
  #users {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* background-color: red;  */
  }
  #search {
    /* background-color: blue;  */
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
</style>

<center>
  <h5>Current Applicants</h5>
</center>
<!-- Trying the table idea -->
<div id="users" class = "">
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
      <tr>
        <th>Applicant Name</th>
        <th>Interview Status</th>
        <th>Committees</th>
        <th>Interview Notes</th>
        <th>Interview Form</th>
        <th>Acceptance Status</th>
      </tr>
    </thead>
    <!-- svelte for each -->

    <tbody class="list">
      {#each mockData as inter}
        <tr>
          <!-- svelte if -->

          <td class="name">{inter['name']}</td>
          <td class="status">
            <form>
              <!-- svelte-ignore a11y-label-has-associated-control -->

              <label>
                {#if inter['shouldInterview'] == 'yes'}
                  <input
                    on:click={() => shouldInterview(inter['name'])}
                    name="group1"
                    type="radio"
                    checked />
                {:else}
                  <input
                    on:click={() => shouldInterview(inter['name'])}
                    name="group1"
                    type="radio" />
                {/if}
                <span>Should Interview</span>
              </label>
              <!-- svelte-ignore a11y-label-has-associated-control -->

              <label>
                {#if inter['shouldInterview'] == 'no'}
                  <input
                    on:click={() => shouldNotInterview(inter['name'])}
                    name="group1"
                    type="radio"
                    checked />
                {:else}
                  <input
                    on:click={() => shouldNotInterview(inter['name'])}
                    name="group1"
                    type="radio" />
                {/if}
                <span>Should Not Interview</span>
              </label>
              <!-- svelte-ignore a11y-label-has-associated-control -->

              <label>
                {#if inter['shouldInterview'] == 'unsure'}
                  <input
                    on:click={() => unevaluated(inter['name'])}
                    name="group1"
                    type="radio"
                    checked />
                {:else}
                  <input
                    on:click={() => unevaluated(inter['name'])}
                    name="group1"
                    type="radio" />
                {/if}
                <span>Unevaluted</span>
              </label>
            </form>
          </td>

          <td>
            {#each inter['committees'] as committee}
              <div class="chip">
                {committee.replace(/^./, committee[0].toUpperCase())}
              </div>
            {/each}
          </td>

          <td>
            <b>
              <Link to="/interview" on:click={() => passName(inter['name'])}>
                Interview Notes
              </Link>
            </b>
          </td>
          <td>
              <Link to="/notes" on:click={() => passName(inter['name'])}>
                <button class="sort btn blue waves-effect waves-light padding"> 
                  Interview
                </button>
              </Link>
           
          </td>

          <td>
            <form>
              <!-- svelte-ignore a11y-label-has-associated-control -->
              <label>
                {#if inter['status'] == 'accept'}
                  <input
                    class="interview"
                    on:click={() => accept(inter['name'])}
                    name="group1"
                    type="radio"
                    checked />
                {:else}
                  <input
                    class="interview"
                    on:click={() => accept(inter['name'])}
                    name="group1"
                    type="radio" />
                {/if}
                <span>Accept</span>
              </label>
              <!-- svelte-ignore a11y-label-has-associated-control -->
              <label>
                {#if inter['status'] == 'reject'}
                  <input
                    class="interview"
                    on:click={() => reject(event, inter['name'])}
                    name="group1"
                    type="radio"
                    checked />
                {:else}
                  <input
                    class="interview"
                    on:click={() => reject(event, inter['name'])}
                    name="group1"
                    type="radio" />
                {/if}
                <span>Reject</span>
              </label>
              <!-- svelte-ignore a11y-label-has-associated-control -->
              <label>
                {#if inter['status'] == 'unsure'}
                  <input
                    class="interview"
                    on:click={() => unsure(inter['name'])}
                    name="group1"
                    type="radio"
                    checked />
                {:else}
                  <input
                    class="interview"
                    on:click={() => unsure(inter['name'])}
                    name="group1"
                    type="radio" />
                {/if}
                <span>Unsure</span>
              </label>
            </form>
          </td>
        </tr>
      {/each}
    </tbody>

  </table>
</div>


<center>
  <h5>Reject Applicants</h5>
</center>

<div id = "users">
  <table>
    <thead>
      <tr>
        <th>Applicant Name</th>
        <th>Interview Status</th>
        <th>Committees</th>
        <th>Interview Notes</th>
        <th>Interview Form</th>
        <th>Acceptance Status</th>
      </tr>
    </thead>
    <tbody id = "rejects">

    </tbody>
  </table>

</div>