<style>
    .divider {
        width: 400px;
        margin-top: 30px;
    }
    .generalInformation {
        background-color: red;
        width: 80%;
    }
    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>

<script>
    import typeForm from "../typeformMockData.json";
    console.log(typeForm)
    let result = [];
    for (let i in typeForm) {
        if(i == "whyCommittee") {
            break; 
        }
        result.push([i, typeForm[i]]);
    }

    let result2 = [1,2,3,4]; 
    // console.log(result); 
</script>

<center>
    <div class="divider"></div>
    <h5>Typeform Data</h5>
</center>
<div class= "wrapper">
    <div class = "generalInformation">
    
        <div>
            {#each result as query}
            <h4>
                {query[0]}
            </h4>
            <p>
                {query[1]}
            </p>
            {/each}
        </div>
        
    
    </div>
    
    <div class = "essayResponses">
    
    </div>
    
    <div class = "misc">
    
    </div>
    
    <div class = "socials">
    
    </div>
</div>

