export type FilmShort = {
	Title: string;
	Year?: number;
	imdbID: string;
	Type: string;
	Poster?: string;
	Awards?: string;
	Actors?: string;
};

export type FilmFull = {
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
