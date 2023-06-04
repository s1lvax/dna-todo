<script lang="ts">
	import { fade } from 'svelte/transition';
	//superforms
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	export let data;

	// superform API:
	const { form, enhance, errors, constraints, delayed } = superForm(data.form, {
		multipleSubmits: 'prevent'
	});
</script>

<main>
	<div class="container" transition:fade>
		<h1 class="h1 m-10">Login</h1>
		<form method="POST" use:enhance class="flex text-center justify-center items-center flex-col">
			<label for="username">Username</label>
			<input
				name="username"
				type="text"
				id="username"
				data-invalid={$errors.username}
				bind:value={$form.username}
				{...$constraints.username}
			/>
			{#if $errors.username}<span class="invalid">{$errors.username}</span>{/if}
			<label for="password">Password</label>
			<input
				name="password"
				type="password"
				id="password"
				data-invalid={$errors.password}
				bind:value={$form.password}
				{...$constraints.password}
			/>
			{#if $errors.password}<span class="invalid">{$errors.password}</span>{/if}
			<button
				>Login{#if $delayed}<span class="delayed"><i class="fa-solid fa-gear fa-spin" /></span
					>{/if}</button
			>
		</form>
		<p>Don't have an account? <a href="/register">Register Here</a></p>
	</div>
</main>
