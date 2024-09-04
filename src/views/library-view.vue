<template>
  <div v-if="!user" class="w-100 mb-3">
    <div class="text-center mb-4">
      <h2 class="fw-bold mb-3">Login Required</h2>
      <p class="text-muted">
        Please log in to access your library and use this feature.
      </p>
    </div>

    <div class="d-flex justify-content-center gap-3">
      <router-link :to="{ name: 'Register', params: {} }">
        <div class="btn btn-primary" style="width: 120px">Sign Up</div>
      </router-link>
      <router-link :to="{ name: 'Login', params: {} }">
        <div class="btn btn-outline-primary" style="width: 120px">Sign In</div>
      </router-link>
    </div>
  </div>

  <div v-else class="w-100 d-flex justify-content-center mb-3">
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
        value="favorites"
        v-model="tab"
        checked
      />
      <label
        class="btn btn-outline-primary"
        style="width: 150px"
        for="btnradio1"
      >
        Favorites
      </label>

      <input
        type="radio"
        class="btn-check"
        name="btnradio"
        id="btnradio2"
        value="saved"
        v-model="tab"
        autocomplete="off"
      />
      <label
        class="btn btn-outline-primary"
        style="width: 150px"
        for="btnradio2"
      >
        Saved
      </label>
    </div>
  </div>

  <!-- Favorites -->
  <div
    v-if="favoritesMovies && tab === 'favorites'"
    class="overflow-hidden w-100 me-5"
  >
    <div v-if="favoritesMovies.length == 0" class="text-center mt-4">
      <p class="text-muted">You haven't saved any movies or TV shows yet.</p>
      <p>Start exploring and save items to your library!</p>
    </div>

    <div v-else>
      <ul
        class="list-unstyled w-100 d-flex flex-wrap justify-content-center gap-4"
        style=""
      >
        <li
          v-for="movie in favoritesMovies"
          :key="movie.data().tmdbID"
          style="width: calc(100% / 5); max-width: 180px; min-width: 110px"
        >
          <movie-card
            :type="movie.data().type"
            :title="movie.data().title"
            :imageURL="movie.data().poster_url"
            :imdbID="movie.data().tmdbID"
          />
        </li>
      </ul>
    </div>
  </div>

  <!-- Saved -->
  <div v-if="savedMovies && tab === 'saved'" class="overflow-hidden w-100 me-5">
    <div v-if="savedMovies.length === 0" class="text-center mt-4">
      <p class="text-muted">You haven't saved any movies or TV shows yet.</p>
      <p>Start exploring and save items to your library!</p>
    </div>

    <div v-else>
      <ul
        class="list-unstyled w-100 d-flex flex-wrap justify-content-center gap-4"
        style=""
      >
        <li
          v-for="movie in savedMovies"
          :key="movie.data().tmdbID"
          style="width: calc(100% / 5); max-width: 180px; min-width: 110px"
        >
          <movie-card
            :type="movie.data().type"
            :title="movie.data().title"
            :imageURL="movie.data().poster_url"
            :imdbID="movie.data().tmdbID"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useFirestore } from "@/composables/useFirestore";
import MovieCard from "@/components/movie-card.vue";
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";

export default {
  components: {
    MovieCard,
  },
  setup() {
    const { getUser } = useAuth();
    const { user } = getUser();

    const { getFavoritesMovies, getSavedMovies, favoritesMovies, savedMovies } =
      useFirestore();
    const tab = ref("favorites");

    if (user.value) {
      getFavoritesMovies();
      getSavedMovies();
    }

    return { user, favoritesMovies, savedMovies, tab };
  },
};
</script>
