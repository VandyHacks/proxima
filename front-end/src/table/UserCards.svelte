<script>
  import { Link } from "svelte-routing";
  import { onMount } from "svelte";
  import List from "list.js";
  import mockData from "../mockData.json";
  import swal from "../../node_modules/sweetalert/dist/sweetalert.min.js"

  onMount(async () => {
    var options = {
      valueNames: ["name", "accept", "interview"]
    };
    var userList = new List("users", options);

    let test = document.querySelectorAll('input'); 
    console.log(test); 

    for (let ele of test) {
      document.addEventListener('click', function() {
        
      })
    }


    // console.log;
  });

  // async function generateAlert() {
  //   // we generate the alert before we upate the db. 

  // }

  function shouldInterview(name, test) {
    console.log(name)
    var cnfrm = confirm('Are you sure?');
        if(cnfrm != true)
        {
          return false;
        }

    // swal("Good job!", "You clicked the button!", "success");
    // var ask = confirm("You have chosen  as your type \n If you have chosen the right type, Click Ok! ")
    
    // if (ask) {
    //     alert("You clicked ok");
    // }
    // else {
    //   return false; 
    //     // alert("You clicked cancel");
    //     // console.log(name['srcElement'])
    //     // name['srcElement'].checked = false;
    // }


    // var cnfrm = confirm('Are you sure?');
    // if(cnfrm != true)
    // {
    //   return false;
    // }

    // swal({
    //   title: "Are you sure?",
    //   text: "Once deleted, you will not be able to recover this imaginary file!",
    //   icon: "warning",
    //   buttons: true,
    //   dangerMode: true,
    // })
    // .then((willChange) => {
    //   if (willChange) {
    //     let ele;
    //     for (ele of mockData) {
    //       if (ele["name"] == name) {
    //         // update if we should interview:
    //         ele["shouldInterview"] = "yes";
    //       }
    //     }
    //     returnState();
    //   } else {
    //     name['srcElement'].checked = false;  
    //     console.log("done change!"); 
    //   }
    // });


    // console.log(name + "" +  test); 
    
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

  function reject(name) {
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

<!-- Trying the table idea -->
<div id="users">
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
                    on:change={() => shouldInterview(event, inter['name'])}
                    name="group1"
                    type="radio"
                    class = "test"
                    checked />
                {:else}
                  <input
                    on:change={() => shouldInterview(event, inter['name'])}
                    name="group1"
                    type="radio" 
                    class = "test"
                    />
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
                    checked
                    class = "test"
                     />
                {:else}
                  <input
                    on:click={() => shouldNotInterview(inter['name'])}
                    name="group1"
                    type="radio" 
                    class = "test"
                    />
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
                    checked 
                    class = "test"
                    />
                {:else}
                  <input
                    on:click={() => unevaluated(inter['name'])}
                    name="group1"
                    type="radio" 
                    class = "test"
                    />
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
                    on:click={() => reject(inter['name'])}
                    name="group1"
                    type="radio"
                    checked />
                {:else}
                  <input
                    class="interview"
                    on:click={() => reject(inter['name'])}
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
