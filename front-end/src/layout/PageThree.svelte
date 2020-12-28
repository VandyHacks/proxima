<script>
    import Title from "./Title.svelte";
    import { Link } from "svelte-routing";
    import InterviwForm from "./InterviewForm.svelte"

    // passing user name from the previous page 
    // and then obtaining full context.
    let name =  localStorage.getItem('curName'); 
    // console.log()
</script>

<Title/>
<center>   
    <Link to = "/">Go Home</Link>
    <h5>Interview Form For {name}</h5>
</center>

<InterviwForm />


