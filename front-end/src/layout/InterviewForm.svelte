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
    .introduction, .introquestions {
        display: flex; 
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .radio {
        display: flex; 
        flex-direction: row;
        justify-content: space-evenly;
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

    // hacky change this! 
    function randNum() {
        return Math.random();
    }
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
        <div class = "section">
            <h5>Intro Blurb
            </h5>
            <p>Thank you for applying to VandyHacks!
                <br>
                <br>
                As a quick overview for how this interview will go, we'll ask you a a couple of questions just to get to know your work habits, then we'll go into a couple questions specific to the committees you indicated you were interested in on your application. If you have any questions, we'll leave a couple of minutes at the end and we can try to answer them as best as possible. Of course, if you don't have any questions, don't feel pressured. We won't count them as part of your application. 
                <br>
                <br>
                We will be taking notes on our laptops to refer back to while you answer.</p>
        </div>
    </div>
    <div class = "introquestions">
        {#each result[1][1] as question}
        {#if question["type"] == "paragraph"}
            <div class = "section">
                <h5>{question["question"]}</h5>
                {#if question["purpose"] != null}
                    <p>{question["purpose"]}</p>
                {/if}
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
        {#if question["type"] == "radio"}
        <!-- {randomNum = Math.random()} -->
        <div class = "section">
            <h5>{question["question"]}</h5>              
            <!-- <form action="#"> -->
                <!-- {#each question["options"] as ele} -->
                
                <div class = "radio">
                  {#each {length: 7} as _, i}
                  <p>
                    <label>
                      <input name="group1" type="radio" />
                      <span>{i + 1}</span>
                    </label>
                  </p>
                  {/each}
                </div>
                
            <!-- </form> -->
        </div>
        {/if}
    {/each}
    </div>
    <!-- </div> -->
</div>