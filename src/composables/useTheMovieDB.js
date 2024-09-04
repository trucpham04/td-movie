import { ref } from "vue";
import axios from "axios";
import {
  THE_MOVIE_DB_HEADER,
  THE_MOVIE_DB_IMAGE_URL,
} from "@/constants/index-constant";

const getDetailsIsPending = ref(false);

export function useTheMovieDB() {
  return {
    tmdbSearch,
    tmdbTrendingMovie,
    tmdbDiscoverMovie,
    tmdbMovieDetails,
    getDetailsIsPending,
    tmdbMovieCredits,
    tmdbMovieTrailer,
    getFullImageURL,
    tmdbMovieRecommendations,
    tmdbTrendingTV,
    tmdbDiscoverTV,
    tmdbTVDetails,
    tmdbTVCredits,
    tmdbTVTrailer,
    tmdbTVRecommendations,
    tmdbFindByMovieID,
    tmdbFindByTVID,
  };
}

// Search

async function tmdbSearch(query) {
  // query = encodeURIComponent(query.trim());
  const result = ref();

  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/search/multi",
    params: {
      query: query,
      include_adult: "false",
      language: "en-US",
      page: "1",
    },
    headers: THE_MOVIE_DB_HEADER,
  };

  await axios
    .request(options)
    .then(function (response) {
      result.value = response.data.results;

      result.value = result.value.filter(
        (e) => e.media_type === "movie" || e.media_type === "tv"
      );

      result.value.forEach((e) => {
        if (e.poster_path)
          e.poster_path = getFullImageURL(e.poster_path, "w500");
      });
    })
    .catch(function (error) {
      console.error(error);
    });

  return result.value;
}

// Start: Movies
async function tmdbTrendingMovie() {
  const result = ref(null);

  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/trending/movie/week",
    params: { language: "en-US" },
    headers: THE_MOVIE_DB_HEADER,
  };

  await axios
    .request(options)
    .then(function (response) {
      result.value = response.data.results;

      result.value.forEach((e) => {
        e.poster_path = getFullImageURL(e.poster_path, "w500");
      });
    })
    .catch(function (error) {
      console.error(error);
    });

  return result.value;
}

async function tmdbDiscoverMovie(page) {
  const result = ref(null);

  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/discover/movie",
    params: {
      include_adult: "false",
      include_video: "false",
      language: "en-US",
      page: page,
      sort_by: "popularity.desc",
    },
    headers: THE_MOVIE_DB_HEADER,
  };

  await axios
    .request(options)
    .then(function (response) {
      result.value = response.data.results;

      result.value.forEach((e) => {
        e.poster_path = getFullImageURL(e.poster_path, "w500");
      });
    })
    .catch(function (error) {
      console.error(error);
    });

  return result.value;
}

async function tmdbMovieDetails(id) {
  getDetailsIsPending.value = true;

  let result;

  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/" + id,
    params: { language: "en-US" },
    headers: THE_MOVIE_DB_HEADER,
  };

  await axios
    .request(options)
    .then(function (response) {
      result = response.data;

      if (result.backdrop_path)
        result.backdrop_path = getFullImageURL(result.backdrop_path, "w500");
      result.poster_path = getFullImageURL(result.poster_path, "original");
    })
    .catch(function (error) {
      console.error(error);
    });

  getDetailsIsPending.value = false;

  return result;
}

async function tmdbMovieCredits(id) {
  let result;

  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${id}/credits`,
    params: { language: "en-US" },
    headers: THE_MOVIE_DB_HEADER,
  };

  await axios
    .request(options)
    .then(function (response) {
      // console.log(response.data);
      result = response.data;
    })
    .catch(function (error) {
      console.error(error);
    });

  return result;
}

async function tmdbMovieTrailer(id) {
  let result, filteredResult;

  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${id}/videos`,
    params: { language: "en-US" },
    headers: THE_MOVIE_DB_HEADER,
  };

  await axios
    .request(options)
    .then(function (response) {
      // console.log(response.data);
      result = response.data.results;
      // console.log(result);
      filteredResult = result.filter((e) => e.type === "Trailer");
      // console.log(filteredResult);
    })
    .catch(function (error) {
      console.error(error);
    });

  if (filteredResult) return filteredResult[0];
  return null;
}

async function tmdbMovieRecommendations(id) {
  let result;

  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${id}/recommendations`,
    params: { language: "en-US", page: "1" },
    headers: THE_MOVIE_DB_HEADER,
  };

  await axios
    .request(options)
    .then(function (response) {
      // console.log(response.data.results);
      result = response.data.results;
    })
    .catch(function (error) {
      console.error(error);
    });

  return result;
}

// End: Movies

// Start: TV series

async function tmdbTrendingTV() {
  const result = ref(null);

  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/trending/tv/week",
    params: { language: "en-US" },
    headers: THE_MOVIE_DB_HEADER,
  };

  await axios
    .request(options)
    .then(function (response) {
      result.value = response.data.results;

      result.value.forEach((e) => {
        e.poster_path = getFullImageURL(e.poster_path, "w500");
      });
    })
    .catch(function (error) {
      console.error(error);
    });

  return result.value;
}

async function tmdbDiscoverTV(page) {
  const result = ref(null);

  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/discover/tv",
    params: {
      include_adult: "false",
      include_video: "false",
      language: "en-US",
      page: page,
      sort_by: "popularity.desc",
    },
    headers: THE_MOVIE_DB_HEADER,
  };

  await axios
    .request(options)
    .then(function (response) {
      result.value = response.data.results;

      result.value.forEach((e) => {
        e.poster_path = getFullImageURL(e.poster_path, "w500");
      });
    })
    .catch(function (error) {
      console.error(error);
    });

  return result.value;
}

async function tmdbTVDetails(id) {
  getDetailsIsPending.value = true;

  let result;

  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/tv/" + id,
    params: { language: "en-US" },
    headers: THE_MOVIE_DB_HEADER,
  };

  await axios
    .request(options)
    .then(function (response) {
      result = response.data;

      result.backdrop_path = getFullImageURL(result.backdrop_path, "w500");
      result.poster_path = getFullImageURL(result.poster_path, "original");
    })
    .catch(function (error) {
      console.error(error);
    });

  getDetailsIsPending.value = false;

  return result;
}

async function tmdbTVCredits(id) {
  let result;

  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/tv/${id}/credits`,
    params: { language: "en-US" },
    headers: THE_MOVIE_DB_HEADER,
  };

  await axios
    .request(options)
    .then(function (response) {
      // console.log(response.data);
      result = response.data;
    })
    .catch(function (error) {
      console.error(error);
    });

  return result;
}

async function tmdbTVTrailer(id) {
  let result, filteredResult;

  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/tv/${id}/videos`,
    params: { language: "en-US" },
    headers: THE_MOVIE_DB_HEADER,
  };

  await axios
    .request(options)
    .then(function (response) {
      // console.log(response.data);
      result = response.data.results;
      // console.log(result);
      filteredResult = result.filter((e) => e.type === "Trailer");
      // console.log(filteredResult);
    })
    .catch(function (error) {
      console.error(error);
    });

  if (filteredResult) return filteredResult[0];
  return null;
}

async function tmdbTVRecommendations(id) {
  let result;

  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/tv/${id}/recommendations`,
    params: { language: "en-US", page: "1" },
    headers: THE_MOVIE_DB_HEADER,
  };

  await axios
    .request(options)
    .then(function (response) {
      // console.log(response.data.results);
      result = response.data.results;
    })
    .catch(function (error) {
      console.error(error);
    });

  return result;
}

// End: TV series

async function tmdbFindByMovieID(imdbID) {
  let tmdbID;

  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/find/" + imdbID,
    params: { external_source: "imdb_id" },
    headers: THE_MOVIE_DB_HEADER,
  };

  await axios
    .request(options)
    .then(function (response) {
      tmdbID = response.data.movie_results[0].id;
    })
    .catch(function (error) {
      console.error(error);
    });

  return tmdbID;
}

async function tmdbFindByTVID(imdbID) {
  let tmdbID;

  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/find/" + imdbID,
    params: { external_source: "imdb_id" },
    headers: THE_MOVIE_DB_HEADER,
  };

  await axios
    .request(options)
    .then(function (response) {
      tmdbID = response.data.tv_results[0].id;
    })
    .catch(function (error) {
      console.error(error);
    });

  return tmdbID;
}

function getFullImageURL(fileName, quality) {
  return THE_MOVIE_DB_IMAGE_URL + quality + fileName;
}
