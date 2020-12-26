<script>
    import Title from "./Title.svelte";
    import TableDesc from "./TableDesc.svelte";
    import UserCards from "./UserCards.svelte"; 
    import { Router, Link, Route } from "svelte-routing";
    import PageTwo from "./PageTwo.svelte"
    let test = "bleh"
</script>
<Router>
	<div>
        <Route path = "/">
            <Title/>
            <TableDesc/>
            <UserCards/>
        </Route>
		<Route path = "/interview" component = "{PageTwo}"/>
	</div>
</Router>