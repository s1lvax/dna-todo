<script>
	//the page store has access to all the load functions aka from the layout.Server.toString, so we use it to check for the user and protect routes
	import { page } from '$app/stores';
</script>

<h1>Hi</h1>

<form action="/logout" method="POST">
	<button type="submit">Logout</button>
</form>
