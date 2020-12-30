<script>
    import Title from "../layout/Title.svelte";
    import UserCards from "../table/UserCards.svelte"; 
    import { Router, Route } from "svelte-routing";
    import PageTwo from "./PageTwo.svelte"
    import PageThree from "./PageThree.svelte"
    window.scrollTo({top: 0})
</script>
<Router>
	<div>
        <Route path = "/">
            <Title/>
            <UserCards/>
        </Route>
        <Route path = "/interview/:applicationId" component = "{PageTwo}"/>
        <Route path = "/notes/:applicationId" component = "{PageThree}" />
	</div>
</Router>