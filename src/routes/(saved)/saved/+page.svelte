<script lang="ts">
	import { Heart } from 'lucide-svelte';
	import Film from '$lib/components/films/film.svelte';
	import { toast } from 'svelte-sonner';

	export let data;
</script>

<section class="container grid items-center gap-6">
	<div class="flex max-w-[980px] flex-col items-start gap-2 mb-4 md:mb-8 ">
		<h1 class="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl l">Saved</h1>
		{#if data.savedFilms.length === 0}
			<p class="max-w-[700px] text-lg text-muted-foreground">
				No saved films. Try pressing the <button on:click={() => toast.success("That's the spirit!")}>
					<Heart class="inline text-red-300 cursor-pointer" />
				</button> when browsing!
			</p>
		{:else}
			<div class="flex flex-col items-center gap-y-4 w-full ">
				{#each data.savedFilms as film}
					<Film {film} user={data.user} />
				{/each}
			</div>
		{/if}
	</div>
</section>
