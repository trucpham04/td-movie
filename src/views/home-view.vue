<template>
  <div class="container">
    <div class="w-100 mb-4">
      <h2 class="fw-semibold mb-4">Trending Movies</h2>
      <div v-if="!trendingMovies" class="w-100 d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div v-else>
        <div class="d-flex overflow-auto">
          <div
            v-for="movie in trendingMovies"
            :key="movie.id"
            class="me-3 movie-card-container"
          >
            <movie-card
              type="movie"
              :imdbID="movie.id"
              :imageURL="movie.poster_path"
              :title="movie.title"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="w-100">
      <h2 class="fw-semibold mb-4">Trending TV Shows</h2>
      <div v-if="!trendingTV" class="w-100 d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div v-else>
        <div class="d-flex overflow-auto">
          <div
            v-for="show in trendingTV"
            :key="show.id"
            class="me-3 movie-card-container"
          >
            <movie-card
              type="tv"
              :imdbID="show.id"
              :imageURL="show.poster_path"
              :title="show.name"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { firebaseAuth } from "@/configs/firebase";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { useTheMovieDB } from "@/composables/useTheMovieDB";
import MovieCard from "@/components/movie-card.vue";

export default {
  components: {
    MovieCard,
  },
  setup() {
    const router = useRouter();
    const { tmdbTrendingMovie, tmdbTrendingTV } = useTheMovieDB();
    const trendingMovies = ref([]);
    const trendingTV = ref([]);

    onMounted(async () => {
      trendingMovies.value = await tmdbTrendingMovie();
      trendingTV.value = await tmdbTrendingTV();
    });

    async function logout() {
      try {
        await firebaseAuth.signOut();
        console.log("Logged out successfully");
        router.push({ name: "Login", params: {} });
      } catch (err) {
        console.log(err.message);
      }
    }

    return { logout, trendingMovies, trendingTV };
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}

@media (max-width: 576px) {
  .container {
    max-width: calc(100vw - 2rem);
  }
  .movie-card-container {
    min-width: 100px;
  }
}

@media (max-width: 992px) and (min-width: 576px) {
  .container {
    max-width: calc(100vw - 80px - 2rem);
  }
  .movie-card-container {
    min-width: 125px;
  }
}

@media (min-width: 992px) {
  .container {
    max-width: calc(100vw - 220px - 2rem);
  }
  .movie-card-container {
    min-width: 180px;
  }
}
</style>
