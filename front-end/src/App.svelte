<script lang="ts">
	// materialize ui. 
	import '../node_modules/materialize-css/dist/css/materialize.min.css';
	import '../node_modules/materialize-css/dist/js/materialize.min.js';
	import { Router, Link, Route } from "svelte-routing";
	import Title from './layout/Title.svelte'
	import TableDesc from './layout/TableDesc.svelte'
	import UserCards from './layout/UserCards.svelte'
	import About from './Pages/About.svelte'
	import '../node_modules/animate.css/animate.min.css'
</script>


<style>

</style>


<!-- <Router> -->
<Title />
<TableDesc />

	<!-- <div class = "container">
		<Route path = "/about" component = {About} />
	</div> -->

<!-- </Router> -->




 