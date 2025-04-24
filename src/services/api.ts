import axios, { AxiosInstance } from 'axios';
import { injectable } from 'inversify';

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;

@injectable()
export class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL:  import.meta.env.VITE_BASE_URL,
      timeout: 5000,
    });

    // Add interceptors
    this.api.interceptors.request.use(
      (config) => config,
      (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
      }
    );

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          console.error('API error:', error.response.status, error.response.data);
        } else if (error.request) {
          console.error('Network error: No response received');
        } else {
          console.error('Axios config error:', error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  async searchMovies(query: string, page: number = 1) {
    try {
      if (!query.trim()) return { movies: [], totalResults: 0 };

      const response = await this.api.get('', {
        params: {
          s: query,
          page,
          apiKey: OMDB_API_KEY,
        },
      });

      const movies = response.data?.Search || [];
      const totalResults = parseInt(response.data?.totalResults || '0', 10);

      return { movies, totalResults };
    } catch (error) {
      return { movies: [], totalResults: 0 };
    }
  }

  async getMovieDetails(imdbID: string) {
    try {
      const response = await this.api.get('', {
        params: {
          i: imdbID,
          plot: 'full',
          apiKey: OMDB_API_KEY,
        },
      });

      return response.data;
    } catch (error) {
      return null;
    }
  }
}