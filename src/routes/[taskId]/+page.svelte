<script lang="ts">
	import type { PageData } from '../$types';
	import { enhance } from '$app/forms';
	import { fade } from 'svelte/transition';

	export let data: PageData;
</script>

<header class="container">
	<hgroup>
		<h1>Editing: {data.task.title}</h1>
	</hgroup>
</header>
<main class="container">
	<div class="container" transition:fade>
		<form method="POST" use:enhance action="?/editTask">
			<label class="label" for="title">Task title</label>
			<input type="text" name="title" value={data.task.title} />

			<label class="label" for="description">Task description</label>
			<textarea name="body" value={data.task.body} />

			<button type="submit">Update Task</button>
		</form>
		<a href="/dashboard">Go back</a>
	</div>
</main>

<style>
	header {
		padding-top: 2rem;
	}
</style>
