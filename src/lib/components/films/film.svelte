<script lang="ts">
	import type { FilmFull } from '$lib/types';
	import { Star } from 'lucide-svelte';
	import { Heart } from 'lucide-svelte';
	import missing from '$lib/assets/missing.jpg';

	export let film: FilmFull;
</script>

<div class="flex justify-between h-32 w-full md:w-4/5 bg-accent gap-x-2 overflow-hidden rounded-md bg-colorBackground">
	<img
		src={film.Poster == 'N/A' ? missing : film.Poster}
		alt={film.Title}
		class="min-h-full w-20"
	/>
	<div class="flex flex-col items-start justify-start flex-grow">
		<h1 class="text-xl md:text-2xl">{film.Title}</h1>
		<h2 class="text-sm md:text-md text-muted-foreground">{film.Actors}</h2>
		<h3 class="text-sm md:text-md text-muted-foreground">{film.Awards}</h3>
	</div>
	<div class="flex flex-col justify-between items-end p-2">
		<div class="flex gap-x-1">
			<Star class="text-yellow-400" fill="currentColor" /><span class="font-semibold"
				>{film.imdbRating}</span
			>
		</div>
		<Heart class="text-red-300" />
	</div>
</div>
