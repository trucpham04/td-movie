<template>
  <nav class="d-flex justify-content-between w-100" style="width: fit-content">
    <router-link to="/" class="text-decoration-none text-body">
      <div
        class="d-flex justify-content-center align-items-center gap-3"
        style="padding: 15px 15px 15px 24px; cursor: pointer"
      >
        <span class="material-symbols-rounded fs-2 fill">home</span>
        <span class="fs-4">Home</span>
      </div>
    </router-link>

    <div
      @click="backToPreviosPage"
      class=""
      style="padding: 15px 15px 15px 24px; cursor: pointer"
    >
      <span class="material-symbols-rounded fs-2">arrow_back_ios</span>
    </div>
  </nav>
  <div class="h-100 w-100">
    <slot />
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();

    function backToPreviosPage() {
      router.go(-1);
    }
    return { backToPreviosPage };
  },
};
</script>
