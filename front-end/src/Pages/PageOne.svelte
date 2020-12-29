<script>
    import Title from "../layout/Title.svelte";
    import TableDesc from "../layout/TableDesc.svelte";
    import UserCards from "../layout/UserCards.svelte"; 
    import { Router, Link, Route } from "svelte-routing";
    import PageTwo from "../layout/PageTwo.svelte"
    import PageThree from "../layout/PageThree.svelte"
    import { component_subscribe } from "svelte/internal";
    window.scrollTo({top: 0})
</script>
<Router>
	<div>
        <!-- Test -->
        <Route path = "/">
            <Title/>
            <TableDesc/>
            <UserCards/>
        </Route>
        <Route path = "/interview" component = "{PageTwo}"/>
        <Route path = "/notes" component = "{PageThree}" />
	</div>
</Router>