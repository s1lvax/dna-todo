<script lang="ts">
	//superforms
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { fade } from 'svelte/transition';
	export let data;

	// superform API:
	const { form, enhance, errors, constraints, delayed } = superForm(data.form, {
		multipleSubmits: 'prevent'
	});
</script>

<body>
	<main class="container">
		<article class="grid">
			<div>
				<hgroup>
					<h1>Register</h1>
					<h2>Start by creating your account.</h2>
				</hgroup>
				<form method="POST" use:enhance>
					<label for="username"> Username </label>
					<input
						name="username"
						type="text"
						id="username"
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
						data-invalid={$errors.confirmPassword}
						bind:value={$form.confirmPassword}
						{...$constraints.confirmPassword}
					/>
					{#if $errors.confirmPassword}<span class="invalid">{$errors.confirmPassword}</span>{/if}
					<button
						>Register{#if $delayed}<span class="delayed"
								><i class="fa-solid fa-gear fa-spin" /></span
							>{/if}</button
					>
				</form>
				<p>Already have an account? <a href="/login">Sign in</a></p>
			</div>
			<div />
		</article>
	</main>
</body>

<style>
	/* Grid */
	body > main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: calc(100vh - 7rem);
		padding: 1rem 0;
	}

	article {
		padding: 0;
		overflow: hidden;
	}

	article div {
		padding: 1rem;
	}

	@media (min-width: 576px) {
		body > main {
			padding: 1.25rem 0;
		}

		article div {
			padding: 1.25rem;
		}
	}

	@media (min-width: 768px) {
		body > main {
			padding: 1.5rem 0;
		}

		article div {
			padding: 1.5rem;
		}
	}

	@media (min-width: 992px) {
		body > main {
			padding: 1.75rem 0;
		}

		article div {
			padding: 1.75rem;
		}
	}

	@media (min-width: 1200px) {
		body > main {
			padding: 2rem 0;
		}

		article div {
			padding: 2rem;
		}
	}

	/* Nav */
	summary[role='link'].secondary:is([aria-current], :hover, :active, :focus) {
		background-color: transparent;
		color: var(--secondary-hover);
	}

	/* Hero Image */
	article div:nth-of-type(2) {
		display: none;
		background-color: #374956;
		background-image: url('../../lib/assets/dna.png');
		background-position: center;
		background-size: cover;
	}

	@media (min-width: 992px) {
		.grid > div:nth-of-type(2) {
			display: block;
		}
	}

	/* Footer */
	body > footer {
		padding: 1rem 0;
	}
</style>
