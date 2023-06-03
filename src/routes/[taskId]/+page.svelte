<script lang="ts">
	import type { PageData } from '../$types';
	import { enhance } from '$app/forms';
	import { fade } from 'svelte/transition';

	export let data: PageData;
</script>

<div class="flex items-center justify-center h-screen flex-col" transition:fade>
	<form
		method="POST"
		use:enhance
		action="?/editTask"
		class="flex text-center justify-center items-center flex-col"
	>
		<h3 class="h3">Editing: {data.task.title}</h3>
		<label class="label" for="title">Task title</label>
		<input type="text" name="title" class="input rounded-lg m-2" value={data.task.title} />

		<label class="label" for="description">Task description</label>
		<textarea name="body" class="input rounded-lg m-2 h-100" value={data.task.body} />

		<button class="btn variant-filled-primary m-5 w-full rounded-lg" type="submit"
			>Update Task</button
		>
	</form>
	<a class="anchor" href="/dashboard">Go back</a>
</div>
