<script>
    import { Link } from "svelte-routing";
    import { onMount } from 'svelte';
    import List from "list.js"; 
    import mockData from "../mockData.json";
    import Status from "./Status.svelte"; 
    import AcceptanceStatus from "./AcceptanceStatus.svelte"


    onMount(async () => {
        var options = {
            valueNames: [ 'name', '', '']
        };
        var userList = new List('users', options);
        console.log(userList)
	});
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
    .justifyCards {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        flex-wrap: wrap;
    }

    .card-panel {
        width: 250px;
        min-height: 270px;
        padding-top: 0px;

    }

    table {
        width: 80%;
        /* text-align: center; */
    }


    #intervierName {
        margin-top: 15px;
    }
    .icons {
        display: flex; 
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        margin: 0;
        padding: 0;
        /* position: relative; */
       
    }
    .emojis p {
        font-size: 30px;
        padding: 0;
        margin: 0;
        margin-top: 5px
    }
    .color {
        background-color: #37618d; 
    }
    .interviewNotes a {
        font-size: 20px;
    }
    .space {
        height: 10px;
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
    .search  {
        /* background-color: green;  */
        width: 46.3%;
        display: flex; 
        flex-direction: column;
    }
</style>



<!-- Trying the table idea -->
<div id = "users">
    <div id = "search">
        <div>
            <input class="search" placeholder="Search By Name" />
        </div>
        <div>
            <button class="sort" data-sort="name">
                Sort By Name
              </button>
              <button class="sort" data-sort="status">
                  Sort By Interview Status
              </button>
              <button class="sort" data-sort="acceptance">
                  Sort By Acceptance Status
              </button>
        </div>

    </div>

    <table class = "striped responsive-table"> 
        <thead>
          <tr>
              <th>Applicant Name</th>
              <th>Interview Status</th>
              <th>Interview Notes</th>
              <th>Acceptance Status</th>
          </tr>
        </thead>
        <!-- svelte for each -->
        
        <tbody class = "list">
        {#each mockData as inter}
          <tr>
              <!-- svelte if -->

              <td class = "name">
                  {inter["name"]}
              </td>
              <td class = "status"> 
                  <Status />
              </td>
              <td>

                  <b><Link to = "/interview"  >Interview Notes</Link></b>
             </td>
              <td class = "acceptance">
                  <AcceptanceStatus /> 
              </td>
          </tr>
          {/each}
        </tbody>
       
      </table>
</div>

