<script lang="ts">
	// materialize ui. 
	import '../node_modules/materialize-css/dist/css/materialize.min.css';
	import '../node_modules/materialize-css/dist/js/materialize.min.js';
	import { Router, Link, Route } from "svelte-routing";
	import Title from './layout/Title.svelte'
	import About from './Pages/About.svelte'
</script>


<style>

</style>


<Router>
	<Title />
	<div>
		<Route path = "/about" component = {About} />
	</div>

</Router>




 