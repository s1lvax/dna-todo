<script lang="ts">
	//the page store has access to all the load functions
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	//get page data
	export let data: PageData;

	//superforms API:
	const { form, enhance, errors, constraints, delayed } = superForm(data.form, {
		multipleSubmits: 'prevent'
	});
</script>

<header class="container" transition:fade>
	<nav>
		<ul>
			<li><h1>{data.user.username}</h1></li>
		</ul>
		<ul />
		<form action="/logout" method="POST">
			<button class="role" type="submit">Logout</button>
		</form>
	</nav>
</header>

<main class="container">
	<div class="grid">
		<div class="container container-padding">
			<h2>Create Tasks</h2>
			<form method="POST" use:enhance action="?/createTask">
				<label class="label" for="title">Task title</label>
				<input
					type="text"
					name="title"
					bind:value={$form.title}
					data-invalid={$errors.title}
					{...$constraints.title}
				/>

				<label for="description">Task description</label>
				<textarea
					name="body"
					bind:value={$form.body}
					data-invalid={$errors.body}
					{...$constraints.body}
				/>
				<button type="submit"
					>{#if $delayed}<span class="delayed"><i class="fa-solid fa-gear fa-spin" /></span>{/if}Add
					Task</button
				>
			</form>
		</div>
		<div class="container">
			<h2>Your Tasks</h2>
			{#if data.existingTasks.length == 0}
				<p>You don't have any tasks.</p>
			{/if}
			{#each data.existingTasks as task}
				<details>
					<summary role="button" class="secondary">{task.title}</summary>
					<p>{task.body}</p>
					<div class="container">
						<form action="?/deleteTask&id={task.id}" method="POST" use:enhance>
							<button type="submit" id="deleteTask" class="secondary outline"
								><i class="fa-solid fa-trash" /></button
							>
						</form>
						<a href="/{task.id}" role="button" class="secondary outline"
							><i class="fa-solid fa-pen" /></a
						>
					</div>
				</details>
			{/each}
		</div>
	</div>
</main>

<style>
	header {
		padding-top: 2rem;
	}
	.container-padding {
		padding-right: 10px;
	}
</style>
