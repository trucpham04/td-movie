<template>
  <div
    v-if="!result"
    class="w-100 h-100 d-flex justify-content-center align-items-center"
  >
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div v-else>
    <div class="d-flex justify-content-center align-items-center">
      <div v-if="result.length === 0" class="text-center text-muted mt-4">
        <i class="bi bi-search me-2"></i>
        <span>No results found</span>
      </div>
    </div>

    <div v-if="result" class="overflow-hidden w-100 me-5">
      <ul
        class="list-unstyled w-100 d-flex flex-wrap justify-content-center gap-4"
        style=""
      >
        <li
          v-for="element in result"
          :key="element.id"
          style="width: calc(100% / 5); max-width: 180px; min-width: 110px"
        >
          <movie-card
            :type="element.media_type"
            :imdbID="element.id"
            :imageURL="element.poster_path ? element.poster_path : null"
            :title="element.title ? element.title : element.name"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
// import { useIMDB } from "@/composables/useIMDB";
import { useTheMovieDB } from "@/composables/useTheMovieDB";
import { useRoute } from "vue-router";
import movieCard from "@/components/movie-card.vue";

export default {
  components: {
    movieCard,
  },
  setup() {
    const route = useRoute();
    const query = ref(null);
    const result = ref(null);

    // const { search, searchIsPending, searchError } = useIMDB();
    const { tmdbSearch } = useTheMovieDB();
    watch(
      route,
      () => {
        query.value = route.params.query;
        fetchData();
      },
      { immediate: true }
    );

    async function fetchData() {
      // result.value = await search(encodeURIComponent(query.value));
      result.value = await tmdbSearch(encodeURIComponent(query.value));
    }

    return { result, fetchData };
  },
};
</script>
