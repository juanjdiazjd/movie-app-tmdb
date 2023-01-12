import { useCallback, useEffect, useMemo, useState } from 'react';
import movieDB from '../api/movies';
import { Movie, MovieDBMoviesResponse } from '../core/interfaces/Movies';

interface MoviesState {
  movies: Movie[];
}

export const useSearchMovie = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [moviesState, setmoviesState] = useState<MoviesState>({
    movies: [],
  });

  const getMoviesByName = async () => {
    setIsLoading(true)
    const moviesResponse = movieDB.get<MovieDBMoviesResponse>(`search/movie?query=${searchTerm}`);

    const resps = await Promise.all([moviesResponse]);

    setmoviesState({
      movies: resps[0].data.results,
    });

    setIsLoading(false);
  };

  useEffect(() => {
    if (searchTerm !== '') {
      getMoviesByName();
    }
  }, [searchTerm]);

  return {
    ...moviesState,
    isLoading,
    searchTerm,
    setSearchTerm,
  };
};
