import type { Saved } from '$lib/server/database/drizzle-schemas';
import type { FilmOmdb } from '$lib/types';
import { OMDB_APIKEY } from '$env/static/private';

export const mapFilmTypes = (filmOmdb: FilmOmdb): Saved => {
	return {
		title: filmOmdb.Title,
		actors: filmOmdb.Actors,
		awards: filmOmdb.Awards,
		poster: filmOmdb.Poster,
		imdbRating: filmOmdb.imdbRating,
		imdbId: filmOmdb.imdbID,
		userId: ''
	};
};

export const fetchFilmByImdbId = async (imdbID: string) => {
	const url = `https://www.omdbapi.com/?&apikey=${OMDB_APIKEY}&i=${imdbID}`;
	const res = await fetch(url);
	const filmOmdb = (await res.json()) as FilmOmdb;

	return mapFilmTypes(filmOmdb);
};
