import { error } from '@sveltejs/kit';
import { OMDB_APIKEY } from '$env/static/private';
import type { FilmShort } from '$lib/types';
import { fetchFilmByImdbId } from '$lib/_helpers/films';

const fetchFilmByTitle = async (title: string) => {
	const url = `https://www.omdbapi.com/?&apikey=${OMDB_APIKEY}&s=${title}`;
	const res = await fetch(url);
	if (!res.ok) {
		console.error(res);
	}
	const filmsShort = (await res.json()) as { Search: FilmShort[] };
	if (!filmsShort) {
		console.error(filmsShort);
	}
	return filmsShort.Search;
};

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const title = url.searchParams.get('title') ?? '';

	if (!title) {
		console.error(`Missing parameter for: title`);
		error(400, `Missing parameter.`);
	}

	try {
		const filmsShort = await fetchFilmByTitle(title);

		const films = await Promise.all(
			filmsShort.map(async (film) => {
				const filmFull = await fetchFilmByImdbId(film.imdbID);
				return filmFull;
			})
		);

		return new Response(JSON.stringify(films), { status: 200 });
	} catch (err) {
		if (err instanceof Error) {
			console.error(err.message);
			error(500, 'Unexpected error occured');
		} else {
			console.error(err);
			error(500, 'Unexpected error occured');
		}
	}
}
