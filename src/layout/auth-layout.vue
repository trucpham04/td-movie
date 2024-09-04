<template>
  <div class="position-fixed" style="height: 100vh; width: 100vw">
    <div class="row w-100 h-100 m-0">
      <div class="col d-table p-0">
        <div class="d-table-cell align-middle">
          <div v-if="title" class="" style="margin-bottom: 8rem">
            <brand-icon :title="title" :description="description" />
            <slot />
          </div>
        </div>
      </div>
      <div class="col d-none d-xxl-block p-0">
        <div
          class="overflow-hidden h-100"
          style="background-repeat: no-repeat; background-size: cover"
          :style="'background-image: url(' + backgroudImageURL + ')'"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import BrandIcon from "@/components/brand-icon-auth-page.vue";
import { useRoute } from "vue-router";
import { ref, watch } from "vue";

export default {
  setup() {
    const route = useRoute();
    const backgroudImageURL = ref(
      "https://img.freepik.com/free-vector/gradient-dynamic-wavy-background_23-2149101398.jpg?w=1380&t=st=1723882444~exp=1723883044~hmac=7a589780edd8540f411c2d5234eb8a539724c1485945da7e3a32bc4fda749843"
    );
    const title = ref(null);
    const description = ref(null);

    const pageDetails = {
      Login: {
        title: "Welcome back!",
        description: "Please enter your details to sign in.",
      },
      Register: {
        title: "Welcome to tdMovie!",
        description: "Create an account to explore more movies.",
      },
    };

    watch(
      route,
      () => {
        const { name } = route;
        if (pageDetails[name]) {
          title.value = pageDetails[name].title;
          description.value = pageDetails[name].description;
        } else {
          title.value = "";
          description.value = "";
        }
      },
      { immediate: true }
    );

    return { backgroudImageURL, title, description };
  },
  components: { BrandIcon },
};
</script>
