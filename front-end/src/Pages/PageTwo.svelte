<script>
    import Title from "../layout/Title.svelte";
    import { Link } from "svelte-routing";
    import TypeForm from "../forms/TypeForm.svelte"; 
    import GoogleForm from "../forms/GoogleForm.svelte"; 

    // passing user name from the previous page 
    // and then obtaining full context.
    let name =  localStorage.getItem('curName'); 
    // console.log()
</script>

<Title/>
    <center>   
        <Link to = "/">Go Home</Link>
        <h5>Inital Application Information For {name}</h5>
    </center>
    <TypeForm /> 
    <GoogleForm /> 


