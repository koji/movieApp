export type MovieData = {
    Title: string;
    Poster: any;
};

export type MovieDetailData = {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string; // need to use split to get each genre
    Director: string;
    Writer: string;
    Actors: string; // need to use split to get each person
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Rating[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string,
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string,
    Response: string;
    Error?: string;
};

type Rating = {
    Source: string;
    Value: string;
};
