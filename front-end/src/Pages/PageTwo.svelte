<script>
    import Title from "../layout/Title.svelte";
    import { Link } from "svelte-routing";
    import TypeForm from "../forms/TypeForm.svelte"; 
    import GoogleForm from "../forms/GoogleForm.svelte"; 

    export let applicationId = 0; 

</script>

    <Title/>
    <div class="center-align">   
        <Link to = "/">Go Home</Link>
        <h5>Inital Application Information For {applicationId}</h5>
    </div>

    <TypeForm /> 
    <GoogleForm /> 


