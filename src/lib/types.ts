export type FilmShort = {
	Title: string;
	Year?: number;
	imdbID: string;
	Type: string;
	Poster?: string;
	Awards?: string;
	Actors?: string;
};

export type FilmOmdb = {
	Title: string;
	Year?: number;
	Rated?: string;
	Released?: string;
	Runtime?: string;
	Genre?: string;
	Director?: string;
	Writer?: string;
	Actors?: string;
	Plot?: string;
	Language?: string;
	Country?: string;
	Awards?: string;
	Poster?: string;
	Ratings?: { Source: string; Value: string }[];
	Metascore?: string;
	imdbRating?: string;
	imdbVotes?: string;
	imdbID: string;
	Type?: string;
	DVD?: string;
	BoxOffice?: string;
	Production?: string;
	Website?: string;
	Response?: string;
};

export type FilmFull = {
	title: string;
	year?: number;
	rated?: string;
	released?: string;
	runtime?: string;
	genre?: string;
	director?: string;
	writer?: string;
	actors?: string;
	plot?: string;
	language?: string;
	country?: string;
	awards?: string;
	poster?: string;
	ratings?: { Source: string; Value: string }[];
	metascore?: string;
	imdbRating?: string;
	imdbVotes?: string;
	imdbId: string;
	type?: string;
	dvd?: string;
	boxOffice?: string;
	production?: string;
	website?: string;
	response?: string;
};

export type Saved = {
	imdbId: string;
	userId: string;
	createdAt?: Date;
	title?: string;
	poster?: string;
	actors?: string;
	awards?: string;
	imdbRating?: string;
};
