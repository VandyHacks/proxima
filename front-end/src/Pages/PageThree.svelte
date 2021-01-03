<script>
  import Title from "../layout/Title.svelte";
  import { Link } from "svelte-routing";
  import InterviwForm from "../forms/InterviewForm.svelte";


  export let applicationId = 0;
</script>

<Title />
<center>
  <Link to="/">Go Home</Link>
  <h5>Interview Form For {applicationId}</h5>
</center>

<InterviwForm />
