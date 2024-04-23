import { fail } from '@sveltejs/kit';
import { setFlash } from 'sveltekit-flash-message/server';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { searchSchema } from '$lib/config/zod-schemas';
import { cleanString } from '$lib/_helpers/cleanString.js';
import { OMDB_APIKEY } from '$env/static/private';
import type { Film } from '$lib/types';

const titleSchema = searchSchema.pick({
	Title: true,
});

// export const load = async (event) => {
// 	const form = await superValidate(event, titleSchema);
// 	return {
// 		form
// 	};
// };

// https://kit.svelte.dev/docs/form-actions


export const actions = {
	default: async (event) => {
		const searchMovieSchema = searchSchema.pick({ Title: true });

		console.log("evetn is");
		console.log(event);

		// if (!form.valid) {
		// 	return fail(400, {
		// 		form
		// 	});
		// }

		try {
		// 	const queryText = cleanString(form.data.Title);
		// 	const url = `https://www.omdbapi.com/?&apikey=${OMDB_APIKEY}&s=${queryText}`;
		// 	const res = await fetch(url);
		// 	if (!res.ok) {
		// 		console.error(res);
		// 		setFlash({ type: 'error', message: 'Something went wrong while searching.' }, event);
		// 	}
		// 	const data = await res.json();
		// 	if (!data) {
		// 		console.error(data);
		// 		setFlash({ type: 'error', message: 'Something went wrong while searching.' }, event);
		// 	}

		// 	const films = data.Search as Film[];
		// 	return { form, films };
	
		} catch (e) {
			//TODO: need to return error message to client
			console.error(e);
			//const { fieldErrors: errors } = e.flatten();
			setFlash({ type: 'error', message: 'Something went wrong while searching.' }, event);
			// return setError(form, 'Something went wrong while searching.');
		}
	}
};
