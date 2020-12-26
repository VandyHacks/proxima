<script>
    // fetch data here, but acting like a db with some mock data. 
    let mockData = [
        {
            name: "aadarsh"
        },
        {
            name: "sayd"
        },
        {
            name: "sam"
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
    }
</style>

<!-- someting like a svelute for each would go here.  -->
<div class = "justifyCards">

    <!-- svelte foreach -->
    <div class="card-panel teal">
        <center>
            <span class="white-text">Aadarsh Jha</span>
            <div class = "interviewStatus">
                <i class="white-text">Interview Potential Status</i>
                <div class = "icons">
                    <div>
                        
                    </div>
                    <div>

                    </div>
                    <div>

                    </div>
                </div>
            </div>

        </center>
        
    </div>  
</div>

