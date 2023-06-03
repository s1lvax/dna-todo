<script lang="ts">
	//the page store has access to all the load functions
	import { page } from '$app/stores';
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

<div class="flex items-center justify-center h-screen flex-col" transition:fade>
	<div class="flex space-x-40 mb-40 justify-between">
		<h1 class="h1">{data.user.username}</h1>
		<form action="/logout" method="POST">
			<button class="btn variant-ghost-error" type="submit">Logout</button>
		</form>
	</div>
	<div class="grid grid-flow-col auto-cols-max gap-80">
		<div>
			<h2 class="h2 mb-10 text-center">Create Tasks</h2>
			<form
				method="POST"
				use:enhance
				action="?/createTask"
				class="flex text-center justify-center items-center flex-col"
			>
				<label class="label" for="title">Task title</label>
				<input
					type="text"
					name="title"
					class="input rounded-lg m-2"
					bind:value={$form.title}
					data-invalid={$errors.title}
					{...$constraints.title}
				/>

				<label class="label" for="description">Task description</label>
				<textarea
					name="body"
					class="input rounded-lg m-2 h-100"
					bind:value={$form.body}
					data-invalid={$errors.body}
					{...$constraints.body}
				/>
				<button class="btn variant-filled-primary m-5 w-full rounded-lg" type="submit"
					>{#if $delayed}<span class="delayed"><i class="fa-solid fa-gear fa-spin" /></span>{/if}Add
					Task</button
				>
			</form>
		</div>
		<div>
			<h2 class="h2 mb-10 text-center">Your Tasks</h2>
			{#if data.existingTasks.length == 0}
				<p>You don't have any tasks.</p>
			{/if}
			{#each data.existingTasks as task}
				<form action="?/deleteTask" method="POST" use:enhance>
					<div class="card p-4">
						<header class="card-header"><h4 class="h4">{task.title}</h4></header>
						<section class="p-4 italic">{task.body}</section>
						<div class="text-center">
							<button formaction="?/deleteTask&id={task.id}" type="submit" id="deleteTask"
								><i class="fa-solid fa-trash" /></button
							>
							<button formaction="?/editTask" type="submit" id="editTask"
								><i class="fa-solid fa-pen" /></button
							>
						</div>
					</div>
				</form>
			{/each}
		</div>
	</div>
</div>
