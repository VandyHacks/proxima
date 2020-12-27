<script>
    import { Router, Link, Route } from "svelte-routing";
    // import clamp from 'clamp-js'; 
    // let mockData = []
    // for testing purposes: 
    import mockData from "../mockData.json";
    import Status from "./Status.svelte"; 
    import AcceptanceStatus from "./AcceptanceStatus.svelte"
 
    function returnMockData() {
        console.log(mockData); 
    }

    // several functions to update the data of the 
    // candidate. 
    function giveInterview(name) {
        console.log(name); 
    }

    function rejectInterview(name) {
        console.log(name); 
    }

    function pending(name) {

    }

    function accept(name) {

    }

    function reject(name) {

    }

    function unsure(name) {

    }

    function passUserName(name) {
        localStorage.setItem('curName', name);
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
        width: 1000px;
        /* text-align: center; */
    }
    /* tr {
        text-align: center;
    } */

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
</style>

<!-- someting like a svelute for each would go here.  -->
<!-- <div class = "justifyCards">
    {#each mockData as inter}
    <div class="card-panel color">
        <center>
            <h5 id = "intervierName" class="white-text">{inter.name}</h5>
            <div class="space"></div>
            <div class = "interviewStatus">
                <i class="white-text">Interview Potential Status</i>
                <div class = "icons">
                    <div class = "emojis">
                        <p on:click = "{rejectInterview(inter.name)}" >&#9989;</p>  
                    </div>
                    <div class = "emojis">
                        <p>&#10060;</p>
                    </div>
                    <div class = "emojis">
                        <p>&#128339;</p>
                    </div>
                </div>
            </div>
            <div class = "space"></div>
            <div class = "interviewNotes">
                <i><Link to = "/interview"  on:click = "{passUserName(inter.name)}">Interview Notes</Link></i>
            </div>
            <div class = "space"></div>
            <div class = "status">
                <i class="white-text">Accept Or Reject</i>
                <div class = "icons">
                    <div class = "emojis">
                        <p>&#9989;</p>  
                    </div>
                    <div class = "emojis">
                        <p>&#10060;</p>
                    </div>
                    <div class="emojis">
                        <p>&#129300;</p>
                    </div>
                </div>
            </div>

        </center>
        
    </div>  
    {/each}
</div> -->

<!-- Trying the table idea -->
<center>
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
        
        <tbody>
        {#each mockData as inter}
          <tr>
              <!-- svelte if -->

              <td>
                  {inter["name"]}
              </td>
              <td> 
                  <Status />
              </td>
              <td>
                  <!-- will need to put router here -->
                  <b><Link to = "/interview"  on:click = "{passUserName(inter.name)}">Interview Notes</Link></b>
             </td>
              <td>
                  <AcceptanceStatus /> 
              </td>
          </tr>
          {/each}
        </tbody>
       
      </table>
</center>
