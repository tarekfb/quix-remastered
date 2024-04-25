<script lang="ts">
	import { type Saved } from '$lib/types';
	import type { User } from 'lucia';
	import { Star } from 'lucide-svelte';
	import { Heart, XCircle } from 'lucide-svelte';
	import missing from '$lib/assets/missing.jpg';
	import { toast } from 'svelte-sonner';
	import { invalidateAll } from '$app/navigation';

	import Film from '$lib/components/films/film.svelte';

	export let user: User | null | undefined = null;
	export let savedFilms: Saved[] = [];
	export let searchedFilms: Saved[] = [];

	const refreshAndInvalidate = async () => {
		await invalidateAll(); // invalidate(route) and depends(route) not working, maybe because trying to invalidate root layout
		return (searchedFilms = searchedFilms.map((film: Saved) => ({
			...film,
			userId: findUserId(film.imdbId) ?? ''
		})));
	};

	const findUserId = (imdbId: string): string | undefined => {
		if (!savedFilms) return undefined;
		const saved = savedFilms.find((saved) => saved.imdbId === imdbId);
		return saved ? saved.userId : undefined;
	};

	const saveFilm = async (film: Saved) => {
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
			body: JSON.stringify({ imdbId: film.imdbId, userId: user.id }),
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
			const savedFilm: Saved = await response.json();
			toast.success(`Saved film '${savedFilm.title}'!`);
			searchedFilms = await refreshAndInvalidate();
		}
	};

	const unsaveFilm = async (film: Saved) => {
		if (!film.userId) {
			toast.info('Not saved yet.');
			return;
		}

		if (!user) {
			toast.info('Not logged in.');
			return;
		}

		const response = await fetch(`/api/saved?imdbId=${film.imdbId}&userId=${user.id}`, {
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
		searchedFilms = await refreshAndInvalidate();
	};
</script>

<div class="flex flex-col items-center gap-y-4">
	{#each searchedFilms as film}
		<Film {film} {saveFilm} {unsaveFilm} />
	{/each}
</div>
