<template>
  <div class="w-100 h-100 position-absolute z-n1 bg-body rounded-top-3"></div>

  <div class="">
    <ul
      class="list-unstyled text-decoration-none text-body d-flex justify-content-around m-0 py-2"
    >
      <li v-for="(option, index) in NAVIGATION_OPTIONS" :key="index">
        <router-link :to="option.route">
          <div class="px-4 py-2">
            <div>
              <span
                class="material-symbols-rounded fs-1"
                :class="route.name === option.name ? 'fill text-primary' : ''"
              >
                {{ option.icon }}
              </span>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { NAVIGATION_OPTIONS } from "@/constants/index-constant";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();

    return { NAVIGATION_OPTIONS, route };
  },
};
</script>
