<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<div class="container" transition:fade>
	<h1 class="h1 m-10">Welcome</h1>
	<div class="flex gap-8">
		<form action="/login">
			<button class="primary">Login</button>
		</form>
		<form action="/register">
			<button class="contrast">Register</button>
		</form>
	</div>
</div>
