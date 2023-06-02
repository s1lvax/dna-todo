<script lang="ts">
	//the page store has access to all the load functions
	import { page } from '$app/stores';
	import { is_empty } from 'svelte/internal';

	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	//get page data
	export let data: PageData;

	//superforms API:
	const { form, enhance } = superForm(data.form);
</script>

<h1>Hi {data.user.username}</h1>

<form method="POST" use:enhance action="?/createTask">
	<label for="title">Task title</label>
	<input type="text" name="title" bind:value={$form.title} />

	<label for="description">Task description</label>
	<input type="text" name="body" bind:value={$form.body} />
	<button type="submit">Add Task</button>
</form>

{#if data.existingTasks.length == 0}
	<p>You don't have any tasks.</p>
{/if}

{#each data.existingTasks as task}
	<h3>{task.title}</h3>
	<p>{task.body}</p>
{/each}

<form action="/logout" method="POST">
	<button type="submit">Logout</button>
</form>
