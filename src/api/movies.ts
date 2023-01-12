import axios from 'axios';
import Config from 'react-native-config';

const movieDB = axios.create({
  baseURL: Config.URL_API_MOVIES,
  params: {
    api_key: Config.API_KEY_TMDB,
    language: 'es-ES',
  },
});

export default movieDB;
