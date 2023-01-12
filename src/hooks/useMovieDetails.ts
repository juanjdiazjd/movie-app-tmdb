import { useEffect, useState } from 'react';
import movieDB from '../api/movies';
import { Cast, CreditsResponse } from '../core/interfaces/Credits';
import { MovieFull } from '../core/interfaces/Movies';

interface MovieDetails {
  isLoading: boolean;
  movieFull?: MovieFull;
  cast: Cast[];
}

export const useMovieDetails = (movieId: number) => {
  const [state, setState] = useState<MovieDetails>({
    isLoading: true,
    movieFull: undefined,
    cast: [],
  });

  const getMovieDetails = async () => {
    const movieDetailsPromise = movieDB.get<MovieFull>(`movie/${movieId}`);
    const castPromise = movieDB.get<CreditsResponse>(`movie/${movieId}/credits`);

    const [movieDetailsResp, castPromiseResp] = await Promise.all([movieDetailsPromise, castPromise]);

    setState({
      isLoading: false,
      movieFull: movieDetailsResp.data,
      cast: castPromiseResp.data.cast,
    });
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  return {
    ...state,
  };
};
