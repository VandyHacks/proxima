<script>
    import Title from "../layout/Title.svelte";
    import UserCards from "../table/UserCards.svelte"; 
    import { Router, Link, Route } from "svelte-routing";
    import PageTwo from "./PageTwo.svelte"
    import PageThree from "./PageThree.svelte"
    import { component_subscribe } from "svelte/internal";
    window.scrollTo({top: 0})
</script>
<Router>
	<div>
        <!-- Test -->
        <Route path = "/">
            <Title/>
            <UserCards/>
        </Route>
        <Route path = "/interview" component = "{PageTwo}"/>
        <Route path = "/notes" component = "{PageThree}" />
	</div>
</Router>