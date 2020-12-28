<script>
    import Title from "./Title.svelte";
    import { Link } from "svelte-routing";

    // passing user name from the previous page 
    // and then obtaining full context.
    let name =  localStorage.getItem('curName'); 
    // console.log()
</script>

<Title/>
    <center>   
        <Link to = "/">Go Home</Link>
        <h5>Interview Notes For {name}</h5>
    </center>
    <!-- <TypeForm /> 
    <GoogleForm />  -->


