<style>
    .divider {
        width: 400px;
        margin-top: 30px;
    }
    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
   
    .collapsible {
        width: 40%;
    }
    .collapsible-body {
        text-overflow:ellipsis; 
        /* background-color: red;  */
        background-color: rgb(249, 249, 249); 
    }
</style>

<script>
    import { onMount } from 'svelte';
    import { element } from "svelte/internal";
    import typeForm from "../typeformMockData.json";
    let result = [];
    for (let i in typeForm) {
        result.push([i, typeForm[i]]);
    }
    onMount(async () => {
        var elems = document.querySelectorAll('.collapsible');
        console.log(elems)
        var instances = M.Collapsible.init(elems, {accordion: false});
        console.log(instances)

    });
</script>

<center>
    <div class="divider"></div>
    <h5>Google Form Data</h5>
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