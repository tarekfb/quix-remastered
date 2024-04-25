<script lang="ts">
	import { Star } from 'lucide-svelte';
	import { Heart, XCircle } from 'lucide-svelte';
	import missing from '$lib/assets/missing.jpg';
	import { toast } from 'svelte-sonner';
	import type { Saved } from '$lib/server/database/drizzle-schemas';
	import { invalidateAll } from '$app/navigation';

	export let user: any = null;

	const saveFilm = async (imdbId: string) => {
		if (film.userId) {
			toast.info('Already saved.');
			return;
		}

		if (!user) {
			toast.info('Not logged in.');
			return;
		}

		const response = await fetch('/api/saved', {
			method: 'POST',
			body: JSON.stringify({ imdbId, userId: user.id }),
			headers: {
				'content-type': 'application/json'
			}
		});
		if (!response.ok) {
			if (response.status === 409) {
				const { message } = await response.json();
				toast.info(message);
			} else {
				toast.error('Something went wrong while saving: ' + film.title);
			}
		} else {
			const savedFilm = await response.json();
			toast.success(`Saved film '${savedFilm.title}'!`);
		}
	};

	const unsaveFilm = async (imdbId: string) => {
		if (!film.userId) {
			toast.info('Not saved yet.');
			return;
		}

		if (!user) {
			toast.info('Not logged in.');
			return;
		}

		const response = await fetch(`/api/saved?imdbId=${imdbId}&userId=${user.id}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json'
			}
		});
		if (!response.ok) {
			const text = await response.text();
			toast.error(text);
			return;
		}

		await response.json();
		toast.success(`Removed film '${film.title}'!`);
		await invalidateAll();
	};

	export let film: Saved;
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
			<button aria-label="Remove film" class="p-1" on:click={() => unsaveFilm(film.imdbId)}>
				<XCircle size={30} />
			</button>
		{:else}
			<button aria-label="Save film" class="p-1" on:click={() => saveFilm(film.imdbId)}>
				<Heart class="text-red-400" fill="currentColor" size={30} />
			</button>
		{/if}
	</div>
</div>
