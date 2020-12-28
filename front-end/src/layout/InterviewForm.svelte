<style>
    img {
        width: 100%;
        height: auto;
    }
    .googleForm {
        display: flex; 
        flex-direction: column;
        justify-content: center;
        /* background-color: green;  */
        align-items: center;
        margin-top: 20px;
    }
    .section {
        /* background-color: red;  */
        display: flex; 
        flex-direction: column;
        padding: 0; 
        background-color: lightblue;
        margin-bottom: 20px;
        width: 50%;
        padding-left: 10px;
        padding-right: 10px; 
        padding-bottom: 10px;
        border-radius: 5px;
    }
    .vandy p {
        font-size: 20px;
        margin: 10px; 
    }
    .introduction {
        display: flex; 
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>

<script>
    // 
    // console.log(googleForm)
    import googleForm from "../googleForm.json"
    // console.log(googleForm)

    let result = [];
    for (let i in googleForm) {
        result.push([i, googleForm[i]]);
    }
    console.log(result); 
    console.log(result[1][1][0])
    // console.log(result)
</script>


<div class = "googleForm">
    <div class = "introduction">
        <div class = "intro section">
            <h5>VIII Interview Form</h5>
            <p>Interviewer form for recruitment season 8 in 2021</p>
        </div>
        <div class = "vandy section">
            <p>&#127881; &#128512;</p>
            <img src="res/vandy.png" alt = "VandyHacks Board!"/>
        </div>
        <!-- some dynamic stuff -->

        <!-- svelte for and if statement -->
        <!-- the json encodes what type of thing ecah thing is lol -->
        {#each result[0][1] as question}
            {#if question["type"] == "paragraph"}
                <div class = "section">
                    <h5>{question["question"]}</h5>
                    <input type="text">
                </div>
            {/if}
            {#if question["type"] == "multiselect"}
            <div class = "section">
                <h5>{question["question"]}</h5>              
                <form action="#">
                    {#each question["options"] as ele}
                    <p>
                        <label>
                            <input type="checkbox" />
                            <span>{ele}</span>
                        </label>
                    </p>
                    {/each}
                </form>
            </div>
        {/if}
        {/each}
    </div>
   
    <div>

    </div>
</div>