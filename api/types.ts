export type Movie = {
    backdrop_path: string;
    id: number;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    title: string;
    vote_average: number;
    vote_count: number;
    budget: number;
    runtime: number;
    revenue: number;
    release_date: string;
}

export type Movies = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export type Cast = {
    character: string;
    credit_id: number;
    id: number;
    name: string;
    profile_path: string;
    title: string;
    poster_path: string;
}

export type Crew = {
    job: string;
    name: string;
    credit_id: number;
}

export type Credits = {
    id: number;
    cast: Cast[];
    crew: Crew[];
}

export type Person = {
    id: number;
    name: string;
    biography: string;
    popularity: number;
    birthday: string;
    profile_path: string;
}

export type MovieCredits = {
    id: number;
    cast: Cast[];
}