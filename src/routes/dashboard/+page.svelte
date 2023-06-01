<script>
	//the page store has access to all the load functions
	import { page } from '$app/stores';
	//get page data
	export let data;
</script>

<h1>Hi {data.user.username}</h1>

<form action="/logout" method="POST">
	<button type="submit">Logout</button>
</form>
