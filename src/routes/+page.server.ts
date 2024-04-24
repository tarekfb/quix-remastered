// import { fail } from '@sveltejs/kit';
import { setFlash } from 'sveltekit-flash-message/server';
// import { setError, superValidate } from 'sveltekit-superforms/server';
// import { searchSchema } from '$lib/config/zod-schemas';
import { cleanString } from '$lib/_helpers/cleanString.js';
import { OMDB_APIKEY } from '$env/static/private';
import type { FilmShort } from '$lib/types';

// const titleSchema = searchSchema.pick({
// 	Title: true,
// });

// export const load = async (event) => {
// 	const form = await superValidate(event, titleSchema);
// 	return {
// 		form
// 	};
// };

// https://kit.svelte.dev/docs/form-actions

const fetchFullMovie = async (imdbID: string) => {
	const url = `https://www.omdbapi.com/?&apikey=${OMDB_APIKEY}&i=${imdbID}`;
	const res = await fetch(url);
	const data = await res.json();
	return data;
};

export const actions = {
	default: async (event) => {
		// const searchMovieSchema = searchSchema.pick({ Title: true });

		const form = await event.request.formData();
		// if (!form.valid) {
		// 	return fail(400, {
		// 		form
		// 	});
		// }

		try {
			const queryText = cleanString(form.get('title') as string);
			const url = `https://www.omdbapi.com/?&apikey=${OMDB_APIKEY}&s=${queryText}`;
			const res = await fetch(url);
			if (!res.ok) {
				console.error(res);
				setFlash({ type: 'error', message: 'Something went wrong while searching.' }, event);
			}
			const data = await res.json();
			if (!data) {
				console.error(data);
				setFlash({ type: 'error', message: 'Something went wrong while searching.' }, event);
			}

			const films = data.Search as FilmShort[];

			const filmsFull = await Promise.all(
				films.map(async (film) => {
					const filmFull = await fetchFullMovie(film.imdbID);
					return filmFull;
				})
			);

			// const omdbURL = `https://www.omdbapi.com/?&apikey=${OMDB_APIKEY}&s=&i=${films[0].imdbID}`;
			// const resFull = await fetch(omdbURL);
			// if (!resFull.ok) {
			// 	console.error(resFull);
			// 	setFlash({ type: 'error', message: 'Something went wrong while searching.' }, event);
			// }
			// const dataFull = await resFull.json();
			// if (!dataFull) {
			// 	console.error(dataFull);
			// 	setFlash({ type: 'error', message: 'Something went wrong while searching.' }, event);
			// }
			// console.log(dataFull);

			// console.log(films[0]);
			return { films: filmsFull };
		} catch (e) {
			//TODO: need to return error message to client
			console.error(e);
			//const { fieldErrors: errors } = e.flatten();
			setFlash({ type: 'error', message: 'Something went wrong while searching.' }, event);
			// return setError(form, 'Something went wrong while searching.');
		}
	}
};
