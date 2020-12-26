<script lang="ts">
	// materialize ui. 
	import '../node_modules/materialize-css/dist/css/materialize.min.css';
	import '../node_modules/materialize-css/dist/js/materialize.min.js';
	import '../node_modules/animate.css/animate.min.css'
	import Title from './layout/Title.svelte'
	import TableDesc from './layout/TableDesc.svelte'
	import UserCards from './layout/UserCards.svelte'
	import PageOne from './layout/PageOne.svelte'; 
	import { Router, Link, Route } from "svelte-routing";
	import PageTwo from './layout/PageTwo.svelte';

</script>
<style>

</style>

<PageOne/>

<!-- <Router>
	<PageOne/>
	<div>
		<Route path = "/" component = "{PageOne}"/>
		<Route path = "/interview" component = "{PageTwo}"/>
	</div>
</Router> -->

<!-- <a href="https://github.com/you"><img loading="lazy" width="149" height="149" src="https://github.blog/wp-content/uploads/2008/12/forkme_right_white_ffffff.png?resize=149%2C149" class="attachment-full size-full" alt="Fork me on GitHub" data-recalc-dims="1"></a> -->
<!-- <Title />
<TableDesc />
<UserCards /> -->








 