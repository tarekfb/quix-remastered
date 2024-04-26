<script lang="ts">
	import { APP_NAME } from '$lib/config/constants';
	import popcorn from '$lib/assets/popcorn.png';
	import inverted from '$lib/assets/popcorn-inverted.png';
	import { mode } from 'mode-watcher';
	import type { PageData } from './$types';
	import { type Saved } from '$lib/types';
	import FilmsContainer from '$lib/components/films/films-container.svelte';
	import { toast } from 'svelte-sonner';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	const isValidParam = (param: string | null) => {
		if (param?.match(/^(?=.*[a-zA-Z]).{2,}$/)) return param;
		else return undefined;
	};

	const findUserId = (imdbId: string): string | undefined => {
		if (!savedFilms) return undefined;
		const saved = savedFilms.find((saved) => saved.imdbId === imdbId);
		return saved ? saved.userId : undefined;
	};

	const getFilmsFromImdb = async () => {
		if (title.length < 1 || !title || !title.trim()) {
			toast.error('Please enter a title.');
			return;
		}
		const response = await fetch('/api/imdb?title=' + title, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});

		if (!response.ok) {
			toast.error('Something went wrong while searching for: ' + title);
			return;
		}

		let films = await response.json();

		if (savedFilms)
			films = films.map((film: Saved) => ({
				...film,
				userId: findUserId(film.imdbId)
			}));

		searchedFilms = films;
	};

	export let data: any;
	let user: PageData['user'];
	let savedFilms: Saved[];
	$: user = data.user;
	$: savedFilms = data.savedFilms;
	let searchedFilms: Saved[] = [];

	const param = isValidParam($page.url.searchParams.get('title'));

	let title = param ? param : '';

	onMount(() => {
		if (title) getFilmsFromImdb();
	});
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
		</section>

		<section class="flex flex-col items-center gap-y-4">
			<form on:submit={() => getFilmsFromImdb()} class="flex w-full max-w-sm items-center gap-x-2">
				<Input
					type="text"
					name="title"
					bind:value={title}
					placeholder="Enter movie title"
					class="bg-background"
				/>
				<Button type="submit">Search</Button>
			</form>
			<FilmsContainer {savedFilms} {searchedFilms} {user} />
		</section>
	</main>
</div>
