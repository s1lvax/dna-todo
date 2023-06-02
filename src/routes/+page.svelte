<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<div class="flex items-center justify-center h-screen flex-col" transition:fade>
	<h1 class="h1 m-10">Welcome</h1>
	<div class="flex gap-8">
		<form action="/login">
			<button class="btn variant-filled-primary">Login</button>
		</form>
		<form action="/register">
			<button class="btn variant-filled-primary">Register</button>
		</form>
	</div>
</div>
