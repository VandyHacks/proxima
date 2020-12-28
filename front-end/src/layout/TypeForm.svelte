<style>
    
    .divider {
        width: 400px;
        margin-top: 30px;
    }
    .generalInformation, .essayResponses, .misc, .socials {
        /* background-color: red; */
        width: 80%;
        display: flex; 
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        background-color: rgb(249, 249, 249); 
        border-radius: 5px;
        padding: 10px;
        padding-right: 15px;
        padding-left: 15px;
        margin-bottom: 15px;
    }
    /* .essayResponses {
        background-color: blue;
    }
    .misc {
        background-color: green;
    }
    .socials {
        background-color: yellow;
    } */
    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .generalInformationResponse, .essayResponseDiv {
        /* background-color: blue; */
        width: 200px;
        display: flex; 
        flex-direction: column;
        /* justify-content: center; */
        /* align-items: center; */
    }
    h6 {
        text-align: justify; 
    }

    .collapsible {
        width: 40%;
    }
    .collapsible-body {
        text-overflow:ellipsis; 
        /* background-color: red;  */
        background-color: rgb(249, 249, 249); 
    }
    .collapsible-body span {
        /* background-color:red;  */
    }
</style>

<script>
import { element } from "svelte/internal";

    import typeForm from "../typeformMockData.json";
    // console.log(typeForm)
    let result = [];
    // let result2 = []; 
    // let result3 = []; 
    // let result4 = []; 
    // let counter = 0; 
    for (let i in typeForm) {
        result.push([i, typeForm[i]]);
        // counter = counter + 1; 
        // if (counter < 7) {
        //     result.push([i, typeForm[i]]);
            
        // } else if (counter >= 7 && counter <= 9) {
        //     result2.push([i, typeForm[i]]); 
        // } else if (counter >= 12 && counter <= 15) {
        //     result3.push([i, typeForm[i]]); 
        // } else {
        //     result4.push([i, typeForm[i]]); 
        // }
        
    }

    // let result2 = [1,2,3,4]; 
    // console.log(result); 

   

  import { onMount } from 'svelte';

  onMount(async () => {
        // document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.collapsible');
        console.log(elems)
        var instances = M.Collapsible.init(elems, {accordion: false});
        console.log(instances)
    // });
 });


// You need to add the Initialization step:

    // document.addEventListener('DOMContentLoaded', function() {
    // var elems = document.querySelectorAll('.collapsible');
    // console.log(elems)
    // var instances = M.Collapsible.init(elems, {accordion: false});
    // console.log(instances)
    // });

</script>

<center>
    <div class="divider"></div>
    <h5>Typeform Data</h5>
</center>

<div class = "wrapper">
    <ul class="collapsible">
        {#each result as query}
            <li class = "">
                <div class="collapsible-header">{query[0]}</div>
                <div class="collapsible-body"><span>{query[1]}</span></div>
            </li>
        {/each}
      </ul>
</div>

<!-- 
<div class= "wrapper">
    <div class = "generalInformation">
        {#each result as query}
        <div class= "">
            <h5>
                {query[0]}
            </h5>
            <p>
                {query[1]}
            </p>
        </div>
        {/each}
    </div>
    
    <div class = "essayResponses">
        <div class = "">
            {#each result2 as query}
            <h5>
                {query[0]}
            </h5>
            <p>
                {query[1]}
            </p>
            {/each}
        </div>
    </div>
    
    <div class = "misc">
        <div>
            {#each result3 as query}
            <h5>
                {query[0]}
            </h5>
            <p>
                {query[1]}
            </p>
            {/each}
        </div>
    </div>
    
    <div class = "socials">
        <div>
            {#each result4 as query}
            <h5>
                {query[0]}
            </h5>
            <p>
                {query[1]}
            </p>
            {/each}
        </div>
    </div>
</div>
 -->
