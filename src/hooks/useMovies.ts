import { useEffect, useState } from 'react';
import movieDB from '../api/movies';
import { Movie, MovieDBMoviesResponse } from '../core/interfaces/Movies';

interface MoviesState {
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upComing: Movie[];
}

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [moviesState, setmoviesState] = useState<MoviesState>({
    nowPlaying: [],
    popular: [],
    topRated: [],
    upComing: [],
  });

  const getMovies = async () => {
    const nowPlayingPromise = movieDB.get<MovieDBMoviesResponse>('movie/now_playing');
    const popularPromise = movieDB.get<MovieDBMoviesResponse>('movie/popular');
    const topRatedPromise = movieDB.get<MovieDBMoviesResponse>('movie/top_rated');
    const upcomingPromise = movieDB.get<MovieDBMoviesResponse>('movie/upcoming');

    const resps = await Promise.all([nowPlayingPromise, popularPromise, topRatedPromise, upcomingPromise]);

    setmoviesState({
      nowPlaying: resps[0].data.results,
      popular: resps[1].data.results,
      topRated: resps[2].data.results,
      upComing: resps[3].data.results,
    });

    setIsLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return {
    ...moviesState,
    isLoading,
  };
};
