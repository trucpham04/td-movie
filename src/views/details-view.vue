<template>
  <div v-if="getDetailsIsPending" class="w-100 d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div v-else class="">
    <div v-if="detail" class="d-flex justify-content-center px-4">
      <div
        class="h-75 w-100 position-fixed z-n1"
        :style="`background: linear-gradient(rgba(100, 100, 100, 0.5), rgba(100, 100, 100, 0.5)), url(${
          detail.backdrop_path ? detail.backdrop_path : ''
        })`"
        style="
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          filter: blur(50px);
        "
      ></div>

      <!-- Start: Main container -->
      <div class="w-100" style="max-width: 1250px">
        <div class="d-flex mt-3 w-100">
          <!-- Start: Poster -->
          <div class="w-75 me-4" style="max-width: fit-content">
            <img
              class="w-100 rounded-3"
              :src="detail.poster_path"
              alt=""
              style="max-width: 300px; min-width: 100px; aspect-ratio: 2 / 3"
            />
          </div>
          <!-- End: Poster -->

          <div class="w-100">
            <div>
              <h1 class="fw-bold">
                {{ detail.title ? detail.title : detail.name }}
              </h1>
            </div>

            <div v-if="route.params.type === 'movie'" class="mb-2 d-flex gap-2">
              <div
                v-if="detail.release_date && detail.release_date !== ''"
                class="d-flex gap-2"
              >
                {{ detail.release_date ? detail.release_date.slice(0, 4) : "" }}
                <span>-</span>
              </div>

              <div v-else>Not released yet</div>

              <div v-if="omdb && omdb.Rated" class="d-flex gap-2">
                <span>{{ omdb.Rated }}</span>
                <span>-</span>
              </div>

              <div v-if="detail.runtime > 0">
                <span>{{ detail.runtime }} min</span>
              </div>
            </div>

            <div v-else class="mb-3 d-flex gap-2">
              <div v-if="detail.first_air_date" class="d-flex gap-2">
                <span>
                  {{
                    detail.first_air_date
                      ? detail.first_air_date.slice(0, 4)
                      : ""
                  }}
                </span>
                <span>-</span>
              </div>

              <div v-if="detail.number_of_seasons" class="d-flex gap-2">
                <span>{{ detail.number_of_seasons }} Season(s)</span>
                <span>-</span>
              </div>

              <div v-if="detail.number_of_episodes">
                <span>{{ detail.number_of_episodes }} Episode(s)</span>
              </div>
            </div>

            <div v-if="omdb" class="d-flex gap-3 mb-3">
              <div
                v-if="omdb.imdbRating"
                class="text-center d-flex align-items-center justify-content-center gap-2"
              >
                <div>
                  <img
                    src="../assets/images/imdb.png"
                    alt=""
                    style="height: 1rem"
                  />
                </div>
                <div>{{ omdb.imdbRating }}</div>
              </div>

              <div
                v-if="omdb.Ratings && omdb.Ratings[1]"
                class="text-center d-flex align-items-center justify-content-center gap-2"
              >
                <div>
                  <img
                    src="../assets/images/Rotten_Tomatoes_logo.svg.png"
                    alt=""
                    style="height: 1rem"
                  />
                </div>
                <div>{{ omdb.Ratings[1].Value }}</div>
              </div>
            </div>

            <!-- Start: User action -->
            <div class="d-flex gap-2 mb-3">
              <div
                v-if="isFavorited != null"
                @click="onClickFavorites"
                class="btn md-btn icon-btn"
                :class="isFavorited ? 'btn-primary' : 'btn-outline-primary'"
              >
                <span
                  class="material-symbols-rounded"
                  :class="isFavorited ? 'fill' : ''"
                >
                  favorite
                </span>
              </div>

              <div
                v-if="isSaved != null"
                @click="onClickSave"
                class="btn md-btn icon-btn"
                :class="isSaved ? 'btn-primary' : 'btn-outline-primary'"
              >
                <span
                  class="material-symbols-rounded"
                  :class="isSaved ? 'fill' : ''"
                >
                  bookmark
                </span>
              </div>

              <div
                class="btn md-btn btn-icon btn-primary d-flex align-items-center justify-content-center fs-6"
                :class="!trailer ? 'disable' : ''"
                @click="openYoutube"
              >
                <span class="material-symbols-rounded fill leading-icon">
                  play_arrow
                </span>
                <div><span>Trailer</span></div>
              </div>
            </div>
            <!-- End: User action -->

            <div v-if="omdb" class="d-none d-md-block w-100">
              <div class="d-flex gap-3">
                <h3 class="fw-semibold">Director</h3>
                <h3 class="">{{ omdb.Director }}</h3>
              </div>
            </div>

            <div class="d-none d-md-block mb-3">
              <div>
                <h3 class="fw-semibold">Genres</h3>
              </div>

              <div class="d-flex gap-2 flex-wrap">
                <div
                  v-for="genre in detail.genres"
                  :key="genre.id"
                  class="chip"
                >
                  <div>{{ genre.name }}</div>
                </div>
              </div>
            </div>

            <div class="d-none d-md-block">
              <div>
                <h3 class="fw-semibold">Overview</h3>
              </div>

              <div>
                <p>{{ detail.overview }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Start: Details on mobile -->
        <div class="d-block d-md-none mt-3">
          <div v-if="omdb" class="mb-3 d-flex gap-3">
            <h3 class="fw-semibold m-0">Director</h3>
            <h3 class="m-0">{{ omdb.Director }}</h3>
          </div>

          <div class="mb-3">
            <div>
              <h3 class="fw-semibold">Genres</h3>
            </div>

            <div class="d-flex gap-2 flex-wrap">
              <div v-for="genre in detail.genres" :key="genre.id" class="chip">
                <div>{{ genre.name }}</div>
              </div>
            </div>
          </div>

          <div class="mb-3">
            <div><h3 class="fw-semibold">Overview</h3></div>
            <div>
              <p>{{ detail.overview }}</p>
            </div>
          </div>
        </div>
        <!-- End: Details on mobile -->

        <!-- Start: Credits -->
        <div class="mt-3 w-100">
          <div v-if="!credits" class="w-100 d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>

          <div v-else class="w-100">
            <div class="mb-3">
              <h3 class="fw-semibold">Top 10 Billed Cast</h3>
            </div>

            <div class="w-100">
              <ul
                class="list-unstyled d-flex w-100 gap-3 overflow-hidden overflow-x-scroll pb-4"
              >
                <li v-for="cast in credits.cast.slice(0, 10)" :key="cast.id">
                  <div
                    class="text-center rounded-3 overflow-hidden bg-body"
                    style="width: 130px; height: 300px"
                  >
                    <div class="w-100">
                      <img
                        class="w-100"
                        :src="
                          cast.profile_path
                            ? getFullImageURL(cast.profile_path, 'w185')
                            : 'https://via.placeholder.com/150x300'
                        "
                        alt=""
                        style="aspect-ratio: 1 / 1.5; object-fit: cover"
                      />
                    </div>
                    <div class="text-start px-2 mt-1">
                      <span class="fw-semibold d-block">{{ cast.name }}</span>
                      <span style="font-size: 13px">{{ cast.character }}</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- End: Credits -->

        <!-- Start: recommendations -->
        <div class="mt-3 w-100">
          <div
            v-if="!recommendations"
            class="w-100 d-flex justify-content-center"
          >
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>

          <div v-else-if="recommendations.length === 0" class="w-100"></div>

          <div v-else class="w-100">
            <div class="mb-3">
              <h3 class="fw-semibold">Recommendations</h3>
            </div>

            <div class="w-100">
              <ul
                class="list-unstyled d-flex w-100 gap-3 overflow-hidden overflow-x-scroll pb-4"
              >
                <li v-for="movie in recommendations" :key="movie.id">
                  <router-link
                    :to="{
                      name: 'Details',
                      params: {
                        type: movie.media_type,
                        id: movie.id,
                      },
                    }"
                    class="text-decoration-none text-body"
                  >
                    <div
                      class="text-center rounded-3 overflow-hidden bg-body"
                      style="width: 250px; aspect-ratio: 3 / 2"
                    >
                      <div class="w-100">
                        <img
                          class="w-100"
                          :src="
                            movie.backdrop_path
                              ? getFullImageURL(movie.backdrop_path, 'w780')
                              : 'https://via.placeholder.com/250x140'
                          "
                          alt=""
                          style="object-fit: cover"
                        />
                      </div>
                      <div class="text-start px-2 mt-1">
                        <span class="fw-semibold d-block">{{
                          movie.title ? movie.title : movie.name
                        }}</span>
                      </div>
                    </div>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- End: recommendations -->
      </div>
      <!-- End: Main container -->
    </div>
  </div>

  <!-- Require login modal -->

  <!-- Button trigger modal -->
  <button
    type="button"
    class="btn btn-primary d-none"
    id="require-login-modal-button"
    data-bs-toggle="modal"
    data-bs-target="#require-login-modal"
  >
    Launch demo modal
  </button>

  <!-- Modal -->
  <div
    class="modal fade"
    id="require-login-modal"
    tabindex="-1"
    aria-labelledby="require-login-modal"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title fs-5" id="exampleModalLabel">
            You need to sign in to use this feature!
          </h2>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-footer">
          <router-link :to="{ name: 'Register', params: {} }">
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              style="width: 100px"
            >
              Sign Up
            </button>
          </router-link>

          <router-link :to="{ name: 'Login', params: {} }">
            <button type="button" class="btn btn-primary" style="width: 100px">
              Sign In
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useTheMovieDB } from "@/composables/useTheMovieDB";
import { useOMDB } from "@/composables/useOMDB";
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
import { useFirestore } from "@/composables/useFirestore";
import { useAuth } from "@/composables/useAuth";

export default {
  setup() {
    const {
      tmdbMovieDetails,
      getDetailsIsPending,
      tmdbMovieCredits,
      tmdbMovieTrailer,
      getFullImageURL,
      tmdbMovieRecommendations,
      tmdbTVDetails,
      tmdbTVCredits,
      tmdbTVTrailer,
      tmdbTVRecommendations,
    } = useTheMovieDB();

    const { getUser } = useAuth();
    const { user } = getUser();

    const { fetchOMDB } = useOMDB();
    const route = useRoute();
    const detail = ref(null);
    const credits = ref(null);
    const trailer = ref(null);
    const recommendations = ref(null);
    const omdb = ref(null);

    const {
      addToLibrary,
      removeFromLibrary,
      getFavoritesMovies,
      getSavedMovies,
      favoritesMovies,
      savedMovies,
    } = useFirestore();

    const isFavorited = ref(null);
    const isSaved = ref(null);

    watch(
      route,
      () => {
        fetchFullMovieDetails();
      },
      { immediate: true }
    );

    async function fetchFullMovieDetails() {
      if (route.params.type === "movie") {
        detail.value = await tmdbMovieDetails(route.params.id);

        omdb.value = await fetchOMDB(detail.value.imdb_id);

        if (user.value) {
          await getFavoritesMovies();
          isFavorited.value = checkFavorites(detail.value.id);

          await getSavedMovies();
          isSaved.value = checkSaved(detail.value.id);
        } else {
          isFavorited.value = false;
          isSaved.value = false;
        }

        trailer.value = await tmdbMovieTrailer(detail.value.id);

        credits.value = await tmdbMovieCredits(detail.value.id);

        recommendations.value = await tmdbMovieRecommendations(detail.value.id);
      } else if (route.params.type === "tv") {
        detail.value = await tmdbTVDetails(route.params.id);

        if (user.value) {
          await getFavoritesMovies();
          isFavorited.value = checkFavorites(detail.value.id);

          await getSavedMovies();
          isSaved.value = checkSaved(detail.value.id);
        } else {
          isFavorited.value = false;
          isSaved.value = false;
        }

        trailer.value = await tmdbTVTrailer(detail.value.id);

        credits.value = await tmdbTVCredits(detail.value.id);

        recommendations.value = await tmdbTVRecommendations(detail.value.id);
      }
    }

    // Start: Check library
    function checkFavorites(tmdbID) {
      if (!favoritesMovies.value) return false;

      return favoritesMovies.value.some((e) => e.data().tmdbID === tmdbID);
    }

    function checkSaved(tmdbID) {
      if (!savedMovies.value) return false;

      return savedMovies.value.some((e) => e.data().tmdbID === tmdbID);
    }
    // End: Check library

    // Start: User action
    function onClickFavorites() {
      if (!user.value) {
        document.querySelector("#require-login-modal-button").click();
        return;
      }

      if (isFavorited.value) {
        isFavorited.value = false;
        removeFromCollection("favorites");
      } else {
        isFavorited.value = true;
        addToCollection("favorites");
      }
    }

    function onClickSave() {
      if (!user.value) {
        document.querySelector("#require-login-modal-button").click();
        return;
      }

      if (isSaved.value) {
        isSaved.value = false;
        removeFromCollection("saved");
      } else {
        isSaved.value = true;
        addToCollection("saved");
      }
    }

    function openYoutube() {
      if (!trailer.value) {
        alert("Cannot open");
        return;
      }
      if (!trailer.value.site === "YouTube") alert("Site is not YouTube!");
      else {
        let youtubeBaseURL = "https://www.youtube.com/watch?v=";
        let trailerURL = youtubeBaseURL + trailer.value.key;

        window.open(trailerURL);
      }
    }

    async function addToCollection(collection) {
      await addToLibrary(
        collection,
        route.params.type.toString(),
        detail.value.id,
        detail.value.title ? detail.value.title : detail.value.name,
        detail.value.poster_path
      );
    }

    async function removeFromCollection(collection) {
      await removeFromLibrary(collection, detail.value.id);
    }
    // End: User action

    return {
      route,
      detail,
      omdb,
      getDetailsIsPending,
      credits,
      trailer,
      openYoutube,
      getFullImageURL,
      recommendations,
      onClickFavorites,
      onClickSave,
      isFavorited,
      isSaved,
    };
  },
};
</script>
