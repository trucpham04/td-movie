<template>
  <div
    class="d-none d-sm-block w-100 user-select-none"
    style="padding: 24px 12px"
  >
    <ul class="d-flex flex-column p-0 m-0 list-unstyled gap" style="gap: 12px">
      <li
        v-for="(option, index) in NAVIGATION_OPTIONS"
        :key="index"
        class="row"
      >
        <router-link :to="option.route" class="text-decoration-none">
          <div
            class="w-100 rounded-3 border-primary d-flex align-items-center text-white"
            :class="
              route.name == option.name ? 'bg-primary' : 'option-on-hover'
            "
            style=""
          >
            <div
              class="d-flex justify-content-start align-items-center w-100"
              style="padding: 12px"
            >
              <i
                class="material-symbols-rounded fs-2"
                :class="route.name == option.name ? 'fill' : ''"
              >
                {{ option.icon }}
              </i>
              <span class="ms-3 d-none d-lg-block fs-5 fw-medium me-5">{{
                option.name
              }}</span>
              <!-- <i class="material-symbols-rounded"> navigate_next </i> -->
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
    // console.log(route.name);

    return { NAVIGATION_OPTIONS, route };
  },
};
</script>
