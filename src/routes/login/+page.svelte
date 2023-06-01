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
	<h1>Login</h1>
	<form method="POST" use:enhance>
		<label for="username">
			Username
		</label>
		<input name="username" type="text" id="username" data-invalid={$errors.username} bind:value={$form.username} {...$constraints.username} />
		{#if $errors.username}<span class="invalid">{$errors.username}</span>{/if}
		<label for="password">
			Password
		</label>
		<input name="password" type="password" id="password" data-invalid={$errors.password} bind:value={$form.password} {...$constraints.password} />
		{#if $errors.password}<span class="invalid">{$errors.password}</span>{/if}
		<button>Login{#if $delayed}<span class="delayed"><i class="fa-solid fa-gear fa-spin"></i></span>{/if}</button>
	</form>
    <p>Don't have an account? <a href="/register">Register Here</a></p>
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