<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<div class="container" transition:fade>
	<header class="container">
		<h1>Welcome</h1>
	</header>
	<main class="container">
		<h2>Why?</h2>
		<p>
			In today's fast-paced world, staying organized is crucial for success. A well-structured to-do
			list can be the key to unlocking your full potential. It goes beyond just keeping track of
			tasks; it's a powerful tool that organizes your life and ideas, providing clarity and focus.
			With our app, you'll experience the joy of crossing off completed items and the satisfaction
			of knowing you're making progress. Embrace the power of organization and see how it can
			transform your productivity and ultimately your life. Join us now and unlock your true
			potential!
		</p>
		<blockquote>
			"Organizing is what you do before you do something so that when you do it, it is not all mixed
			up."
			<footer>
				<cite>- A. A. Milne</cite>
			</footer>
		</blockquote>
		<div class="grid">
			<form action="/login">
				<button class="primary">Login</button>
			</form>
			<form action="/register">
				<button class="contrast">Register</button>
			</form>
		</div>
	</main>
</div>
