<script lang="ts">
	import { APP_NAME } from '$lib/config/constants';

	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import Film from '$lib/components/films/film.svelte';
	import popcorn from '$lib/assets/popcorn.png';
	import inverted from '$lib/assets/popcorn-inverted.png';
	import { mode } from 'mode-watcher';

	export let form;
</script>

<svelte:head>
	<title>{APP_NAME}</title>
	<meta
		name="description"
		content="Sveltekit Auth Starter - An open source auth starter project utilizing lucia-auth, skeleton ui, prisma and sveltekit."
	/>
</svelte:head>
<div class="flex-1">
	<main class="container px-4 md:px-8 grid items-center gap-6">
		<section class="flex flex-col items-center gap-2">
			<img src={$mode === 'light' ? popcorn : inverted} alt="Logo" class="w-32" />
			<h1 class="text-3xl font-semibold md:text-4xl">
				{APP_NAME}
			</h1>
			<h2 class="text-xl md:text-2xl text-muted-foreground mb-4">Quickly index IMDB</h2>
			<form method="POST" use:enhance class="flex w-full max-w-sm items-center gap-x-2">
				<Input type="text" name="title" placeholder="Enter movie title" class="bg-background" />
				<Button type="submit">Search</Button>
			</form>
		</section>

		<section class="flex flex-col items-center gap-y-4">
			{#if form?.films}
				{#each form.films as film}
					<Film {film} />
				{/each}
			{/if}
		</section>
	</main>
</div>
