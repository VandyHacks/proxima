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
  });


  function shouldInterview(name) {
    for (let ele of mockData) {
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

  function accept(event, name) {
    // getting the row data. 
    let domElement = ((event['target']).parentElement.parentElement.parentElement.parentElement); 
    console.log(domElement)

    let list = Array.from(document.getElementById('rejects').childNodes); 

    // if we accept a candidate once theyre in the already rejected table, 
    // we have to bring them back, this is how we do that. 
    for (let ele of list) {
      if (domElement == ele) {
        domElement.remove(); 
        document.getElementById('candidates').append(domElement); 
      }
    }

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

    // if we reject a candidate we put them in a rejections table
    let domElement = ((event['target']).parentElement.parentElement.parentElement.parentElement); 
    domElement.remove(); 
    updateRejectTable(domElement); 

    let ele;
    for (ele of mockData) {
      if (ele["name"] == name) {
        ele["status"] = "reject";
      }
    }
    returnState();
  }
  function unsure(event, name) {

    // if we change the status of a candidate to unsure
    // while theyre in the rejection table, we have to make sure
    // we bring thembnack to the same view. again. 
    let domElement = ((event['target']).parentElement.parentElement.parentElement.parentElement); 
    console.log(domElement)
    let list = Array.from(document.getElementById('rejects').childNodes); 
    console.log(list); 
    for (let ele of list) {
      if (domElement == ele) {
        domElement.remove(); 
        document.getElementById('candidates').append(domElement); 
      }
    }

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

  function freezeRow(event) {

    let button = event['target']; 
    let tableRow = event['target'].parentElement.parentElement;  

    // basically just apply disbled to all inputs in the paticular row. 
    let array = Array.from(tableRow.querySelectorAll('input')); 

    for (let ele of array) {
      if(ele.getAttribute("disabled") == "true") {
        ele.removeAttribute("disabled"); 
      } else {
        ele.setAttribute("disabled", "true");
      }
      
    }
    // console.log(button.textContent)
    if (button.textContent == "Unfinalize") {
      button.textContent = "Finalize"; 
    } else {
      button.textContent = "Unfinalize"; 
    }
    
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
  tr.rows > td, tr.column-names > th {
    text-align: center;
  }

  tr.director {
    background-color: antiquewhite;
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
      <tr class="column-names">
        <th>Applicant Name</th>
        <th>Email</th>
        <th>Year</th>
        <th>Committees</th>
        <th>Links</th>
        <th>Notes</th>
        <th>Interview Form</th>
        <th>Status</th>
      </tr>
    </thead>
    <!-- svelte for each -->

    <tbody class="list" id = "candidates">
      {#each mockData as application}

        <tr class="rows{application['director']? ' director' : ''}">
        
          <td class="name text">
            {application['name']}
          </td>

          <td class="email">
            <a href="mailto:{application['email']}">
              {application['email']}
            </a>
          </td>

          <td class="year">
              {application['year']}
          </td>

          <td class="committees">
            {#each application['committees'] as committee}
              <div class="chip">
                {committee.replace(/^./, committee[0].toUpperCase())}
              </div>
            {/each}
          </td>

          <td class="links">

          </td>

          <td>
            <b>
              <Link to="/interview" on:click={() => passName(application['name'])}>
                Interview Notes
              </Link>
            </b>
          </td>
          <td>
            <Link to="/notes" on:click={() => passName(application['name'])}>
              <button class="sort btn blue waves-effect waves-light padding"> 
                Interview
              </button>
            </Link>
           
          </td>

          <td>
            <form>
              <!-- svelte-ignore a11y-label-has-associated-control -->
              <label>
                {#if application['status'] == 'accept'}
                  <input
                    class="interview"
                    on:click={() => accept(event, application['name'])}
                    name="group1"
                    type="radio"
                    checked />
                {:else}
                  <input
                    class="interview"
                    on:click={() => accept(event, application['name'])}
                    name="group1"
                    type="radio" />
                {/if}
                <span>Accept</span>
              </label>
              <!-- svelte-ignore a11y-label-has-associated-control -->
              <label>
                {#if application['status'] == 'reject'}
                  <input
                    class="interview"
                    on:click={() => reject(event, application['name'])}
                    name="group1"
                    type="radio"
                    checked />
                {:else}
                  <input
                    class="interview"
                    on:click={() => reject(event, application['name'])}
                    name="group1"
                    type="radio" />
                {/if}
                <span>Reject</span>
              </label>
              <!-- svelte-ignore a11y-label-has-associated-control -->
              <label>
                {#if application['status'] == 'unsure'}
                  <input
                    class="interview"
                    on:click={() => unsure(event, application['name'])}
                    name="group1"
                    type="radio"
                    checked />
                {:else}
                  <input
                    class="interview"
                    on:click={() => unsure(event, application['name'])}
                    name="group1"
                    type="radio" />
                {/if}
                <span>Unsure</span>
              </label>
            </form>
          </td>
          <td>
            <button on:click={() => freezeRow(event)} class = "sort btn blue waves-effect waves-light padding"> 
              Finalize 
            </button>
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
      <tr class="column-names">
        <th>Applicant Name</th>
        <th>Email</th>
        <th>Year</th>
        <th>Committees</th>
        <th>Links</th>
        <th>Notes</th>
        <th>Interview Form</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody id = "rejects">

    </tbody>
  </table>

</div>