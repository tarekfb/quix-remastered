import type { FilmFull } from "$lib/types";
import db from '$lib/server/database/drizzle';

export const saveFilm = async (film: FilmFull) => {
	console.log('id is', film.imdbID);
    db.insert('films').values(film).onConflictDoNothing().returning();
};
