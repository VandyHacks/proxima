<script>
    import clamp from 'clamp-js'; 
    
    // just clamping the header so the name doesnt invade the space
    // of the card. 
    // console.log(document.getElementsByClassName('icons'))
    // clamp(document.getElementById('intervierName'), {clamp: 1})
    // fetch data here, but acting like a db with some mock data. 
    let mockData = [
        {
            name: "Aadarsh Jha",
            shouldInterview: "unsure", 
            status: "unsure"
        },
        {
            name: "Saydolimkhon Agzamkhodjaev",
            shouldInterview: "unsure",
            status: "unsure"

        },
        {
            name: "Samuel Lee",
            shouldInterview: "unsure", 
            status: "unsure"
        }, 
        {
            name: "John Doe",
            shouldInterview: "unsure", 
            status: "unsure"
        }, 
        {
            name: "Surya Thalli",
            shouldInterview: "unsure", 
            status: "unsure"
        }, 
        {
            name: "Gabriel Ting",
            shouldInterview: "unsure", 
            status: "unsure"
        }, 
        {
            name: "Ananya Gondi",
            shouldInterview: "unsure", 
            status: "unsure"
        }
    ]

    
    // for testing purposes: 
    function returnMockData() {
        console.log(mockData); 
    }

    // several functions to update the data of the 
    // candidate. 
    function giveInterview(name) {

    }

    function rejectInterview(name) {

    }

    function pending(name) {

    }

    function accept(name) {

    }

    function reject(name) {

    }

    function unsure(name) {

    }

    // returnMockData(); 
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
        background-color: #375370; 
    }
    .interviewNotes a {
        font-size: 20px;
    }
    .space {
        height: 10px;
    }
</style>

<!-- someting like a svelute for each would go here.  -->
<div class = "justifyCards">

    <!-- svelte foreach -->
    {#each mockData as inter}
    <div class="card-panel color">
        <center>
            <h5 id = "intervierName" class="white-text">{inter.name}</h5>
            <div class="space"></div>
            <div class = "interviewStatus">
                <i class="white-text">Interview Potential Status</i>
                <div class = "icons">
                    <div class = "emojis">
                        <p>&#9989;</p>  
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
                <i><a href="">Interview Notes</a></i>
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
</div>

