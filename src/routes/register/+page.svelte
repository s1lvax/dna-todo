<script lang="ts">
	//superforms
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { superForm } from 'sveltekit-superforms/client'
	export let data;

	// superform API:
	const { form, enhance, errors, constraints, delayed  } = superForm(data.form, {
		multipleSubmits: 'prevent'
	});

</script>
<div class="container">
	<h1>Register</h1>
	<form method="POST" use:enhance>
		<label>
			Username
			<input name="username" type="text" id="username" data-invalid={$errors.username} bind:value={$form.username} {...$constraints.username} />
			{#if $errors.username}<span class="invalid">{$errors.username}</span>{/if}
		</label>
		<label>
			Email
			<input name="email" type="email" id="email" data-invalid={$errors.email} bind:value={$form.email} {...$constraints.email}/>
			{#if $errors.email}<span class="invalid">{$errors.email}</span>{/if}
		</label>
		<label>
			Password
			<input name="password" type="password" id="password" data-invalid={$errors.password} bind:value={$form.password} {...$constraints.password} />
			{#if $errors.password}<span class="invalid">{$errors.password}</span>{/if}
		</label>
		<label>
			Confirm Password
			<input name="confirmPassword" type="password" id="confirmPassword" data-invalid={$errors.confirmPassword} bind:value={$form.confirmPassword} {...$constraints.confirmPassword} />
			{#if $errors.confirmPassword}<span class="invalid">{$errors.confirmPassword}</span>{/if}
		</label>
		<button>Register{#if $delayed}<span class="delayed"><i class="fa-solid fa-gear fa-spin"></i></span>{/if}</button>
	</form>
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.invalid {
		color: red;
	}
</style>