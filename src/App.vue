<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();

    return { layout: computed(() => route.meta.layout + "-layout") };
  },
};
</script>
