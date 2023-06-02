<script lang="ts">
	//superforms
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	export let data;

	// superform API:
	const { form, enhance, errors, constraints, delayed } = superForm(data.form, {
		multipleSubmits: 'prevent'
	});
</script>

<div class="flex items-center justify-center h-screen flex-col">
	<h1 class="h1 m-10">Register</h1>
	<form method="POST" use:enhance>
		<label for="username" class="label"> Username </label>
		<input
			name="username"
			type="text"
			id="username"
			class="input m-2"
			data-invalid={$errors.username}
			bind:value={$form.username}
			{...$constraints.username}
		/>
		{#if $errors.username}<span class="invalid">{$errors.username}</span>{/if}
		<label for="email"> Email </label>
		<input
			name="email"
			type="email"
			id="email"
			class="input m-2"
			data-invalid={$errors.email}
			bind:value={$form.email}
			{...$constraints.email}
		/>
		{#if $errors.email}<span class="invalid">{$errors.email}</span>{/if}
		<label for="password"> Password </label>
		<input
			name="password"
			type="password"
			id="password"
			class="input m-2"
			data-invalid={$errors.password}
			bind:value={$form.password}
			{...$constraints.password}
		/>
		{#if $errors.password}<span class="invalid">{$errors.password}</span>{/if}
		<label for="confirmPassword"> Confirm Password </label>
		<input
			name="confirmPassword"
			type="password"
			id="confirmPassword"
			class="input m-2"
			data-invalid={$errors.confirmPassword}
			bind:value={$form.confirmPassword}
			{...$constraints.confirmPassword}
		/>
		{#if $errors.confirmPassword}<span class="invalid">{$errors.confirmPassword}</span>{/if}
		<button class="btn variant-filled-primary m-5 w-full"
			>Register{#if $delayed}<span class="delayed"><i class="fa-solid fa-gear fa-spin" /></span
				>{/if}</button
		>
	</form>
	<p>Already have an account? <a class="anchor" href="/login">Login Here</a></p>
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	form {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.invalid {
		color: red;
	}
</style>
