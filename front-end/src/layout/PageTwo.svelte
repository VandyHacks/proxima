<script>
    import Title from "./Title.svelte";
    import TableDesc from "./TableDesc.svelte";
    import UserCards from "./UserCards.svelte"; 
    import { Router, Link, Route } from "svelte-routing";

    // passing user name from the previous page 
    // and then obtaining full context.
    let name =  localStorage.getItem('curName'); 
    // console.log()
</script>

<Title/>
<center>
    <Link to = "/">Go Home</Link>
    <h4>Application Information For {name}</h4>
</center>

