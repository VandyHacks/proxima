<script>
    // fetch data here, but acting like a db with some mock data. 
    let mockData = [
        {
            name: "Aadarsh Jha",
            shouldInterview: "", 
            status: ""
        },
        {
            name: "Saydolimkhon Agzamkhodjaev",
            shouldInterview: "",
            status: ""

        },
        {
            name: "Samuel Lee",
            shouldInterview: "", 
            status: ""
        }, 
        {
            name: "John Doe",
            shouldInterview: "", 
            status: ""
        }, 
        {
            name: "Surya Thalli",
            shouldInterview: "", 
            status: ""
        }, 
        {
            name: "Gabriel Ting",
            shouldInterview: "", 
            status: ""
        }, 
        {
            name: "Ananya Gondi",
            shouldInterview: "", 
            status: ""
        }
    ]
</script>

<style>
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
        background-color: rgb(197, 235, 248); 
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
    <div class="card-panel black">
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
                </div>
            </div>

        </center>
        
    </div>  
    {/each}
</div>

