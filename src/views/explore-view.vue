<template>
  <div class="w-100 d-flex justify-content-center mb-3">
    <div
      class="btn-group"
      role="group"
      aria-label="Basic radio toggle button group"
    >
      <input
        type="radio"
        class="btn-check"
        name="btnradio"
        id="btnradio1"
        autocomplete="off"
        value="movies"
        v-model="type"
        checked
      />
      <label
        class="btn btn-outline-primary"
        style="width: 150px"
        for="btnradio1"
      >
        Movies
      </label>

      <input
        type="radio"
        class="btn-check"
        name="btnradio"
        id="btnradio2"
        value="tvSeries"
        v-model="type"
        autocomplete="off"
      />
      <label
        class="btn btn-outline-primary"
        style="width: 150px"
        for="btnradio2"
      >
        TV Series
      </label>
    </div>
  </div>

  <div v-if="!trendingMovies" class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div v-else-if="type === 'movies'" class="overflow-hidden w-100 me-5">
    <ul
      class="list-unstyled w-100 d-flex flex-wrap justify-content-center gap-4"
      style=""
    >
      <li
        v-for="movie in trendingMovies"
        :key="movie.id"
        style="width: calc(100% / 5); max-width: 180px; min-width: 110px"
      >
        <movie-card
          type="movie"
          :title="movie.title"
          :imageURL="movie.poster_path"
          :imdbID="movie.id"
        />
      </li>
    </ul>
  </div>

  <div v-else-if="type === 'tvSeries'" class="overflow-hidden w-100 me-5">
    <ul
      class="list-unstyled w-100 d-flex flex-wrap justify-content-center gap-4"
      style=""
    >
      <li
        v-for="serie in trendingTV"
        :key="serie.id"
        style="width: calc(100% / 5); max-width: 180px; min-width: 110px"
      >
        <movie-card
          type="tv"
          :title="serie.name"
          :imageURL="serie.poster_path"
          :imdbID="serie.id"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import movieCard from "@/components/movie-card.vue";
import { isReachedBottom } from "@/composables/useDefaultLayout";
import { useTheMovieDB } from "@/composables/useTheMovieDB";
import { ref, watch } from "vue";

export default {
  components: {
    movieCard,
  },
  setup() {
    const { tmdbDiscoverMovie, tmdbDiscoverTV } = useTheMovieDB();
    const trendingMovies = ref(null);
    const trendingTV = ref(null);
    const type = ref("movies");
    let moviePage = 1;
    let tvPage = 1;

    fetchDiscoverMovie(moviePage);
    fetchDiscoverTV(tvPage);

    watch(isReachedBottom, () => {
      if (type.value === "movies") {
        moviePage++;
        fetchDiscoverMovie(moviePage);
      } else {
        tvPage++;
        fetchDiscoverTV(tvPage);
      }
    });

    async function fetchDiscoverMovie(page) {
      if (page === 1) trendingMovies.value = await tmdbDiscoverMovie(page);
      else trendingMovies.value.push(...(await tmdbDiscoverMovie(page)));
    }

    async function fetchDiscoverTV(page) {
      if (page === 1) trendingTV.value = await tmdbDiscoverTV(page);
      else trendingTV.value.push(...(await tmdbDiscoverTV(page)));
    }

    return { trendingTV, trendingMovies, type };
  },
};
</script>
