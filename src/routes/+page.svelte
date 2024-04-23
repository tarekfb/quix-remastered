<script lang="ts">
	import { APP_NAME } from '$lib/config/constants';

	import { Loader2 } from 'lucide-svelte';
	import { AlertCircle } from 'lucide-svelte';
	import { enhance } from '$app/forms';

	import type { PageData } from './$types.js';
	export let data: PageData;
</script>

<svelte:head>
	<title>{APP_NAME}</title>
	<meta
		name="description"
		content="Sveltekit Auth Starter - An open source auth starter project utilizing lucia-auth, skeleton ui, prisma and sveltekit."
	/>
</svelte:head>
<div class="flex-1">
	<main class="container grid items-center gap-6">
		<section class="flex flex-col items-center gap-2">
			<h1 class="text-3xl font-semibold md:text-4xl">
				{APP_NAME}
			</h1>
			<h2 class="text-xl md:text-2xl text-muted-foreground">Quickly index IMDB</h2>
			<form method="POST" use:enhance>
				<label for="title">Title</label>
				<input type="text" name="name" />
				<button>Submit</button>
			</form>
		</section>

		<section>
			<!-- here im hoping to use forms.movies, but typescript indicates there is no field called forms.movies -->
			<!-- {#if form.}
				{#each form.movies as movie }
					
				{/each}
			{/if}					 -->
			<!-- {form?.} -->
		</section>
	</main>
</div>
