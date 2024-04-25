<script lang="ts">
	import { Star } from 'lucide-svelte';
	import { Heart, XCircle } from 'lucide-svelte';
	import missing from '$lib/assets/missing.jpg';
	import { type Saved } from '$lib/types';

	export let film: Saved;
	export let saveFilm: (film: Saved) => void;
	export let unsaveFilm: (film: Saved) => void;
</script>

<div
	class="flex justify-between h-32 w-full md:w-4/5 bg-accent gap-x-2 overflow-hidden rounded-md bg-colorBackground"
>
	<img
		src={film.poster == 'N/A' ? missing : film.poster}
		alt={film.title}
		class="min-h-full w-20"
	/>
	<div class="flex flex-col items-start justify-start flex-grow">
		<h1 class="text-xl md:text-2xl">{film.title}</h1>
		<h2 class="text-sm md:text-md text-muted-foreground">{film.actors}</h2>
		<h3 class="text-sm md:text-md text-muted-foreground">{film.awards}</h3>
	</div>
	<div class="flex flex-col justify-between items-end p-2">
		<div class="flex gap-x-1">
			<Star class="text-yellow-400" fill="currentColor" /><span class="font-semibold"
				>{film.imdbRating}</span
			>
		</div>

		{#if film.userId}
			<button aria-label="Remove film" class="p-1" on:click={() => unsaveFilm(film)}>
				<XCircle size={30} />
			</button>
		{:else}
			<button aria-label="Save film" class="p-1" on:click={() => saveFilm(film)}>
				<Heart class="text-red-400" fill="currentColor" size={30} />
			</button>
		{/if}
	</div>
</div>
