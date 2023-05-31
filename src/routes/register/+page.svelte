<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<h1>Register</h1>
<form method="POST" use:enhance>
	<label>
		Username
		<input name="username" type="text" id="username" required />
	</label>
	<label>
		Email
		<input name="email" type="email" id="Email" required />
	</label>
	<label>
		Password
		<input name="password" type="password" id="password" required />
	</label>
	<label>
		Confirm Password
		<input name="confirmPassword" type="password" id="confirmPassword" required />
	</label>
	<button>Register</button>
	{#if form?.alreadyExists}<p class="error">Username already exists!</p>{/if}
	{#if form?.noMatch}<p class="error">Passwords don't match!</p>{/if}
</form>
