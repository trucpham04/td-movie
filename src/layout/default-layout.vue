<template>
  <div
    class="position-fixed min-vw-100"
    style="
      background: linear-gradient(
        179.4deg,
        rgb(12, 20, 69) -16.9%,
        rgb(71, 30, 84) 119.9%
      );
    "
  >
    <div class="d-flex flex-column min-vh-100 position-relative">
      <div class="flex-shrink-0" style="background-color: inherit">
        <header-navigation />
      </div>

      <div class="d-flex overflow-hidden" style="flex: 1">
        <div
          class="position-sticky"
          style="background-color: inherit; max-width: 240px"
        >
          <side-bar-navigation />
        </div>

        <div
          class="m-3 w-75 h-100 overflow-hidden overflow-y-scroll"
          id="content-container"
          style="flex: 1; max-height: calc(100vh - 66px)"
        >
          <slot />

          <div
            v-if="isShowBackToTop"
            class="position-absolute"
            style="bottom: 125px; right: 50px"
          >
            <div
              @click="onBackToTop"
              class="btn icon-btn md-btn btn-primary"
              style="width: 50px; height: 50px"
            >
              <i class="material-symbols-rounded fs-3">keyboard_arrow_up</i>
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex-shrink-0 w-100 position-fixed bottom-0 d-block d-sm-none"
      >
        <bottom-navigation />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNavigation from "@/components/header-navigation.vue";
import SideBarNavigation from "@/components/sidebar-navigation.vue";
import BottomNavigation from "@/components/bottom-navigation.vue";
import { isReachedBottom } from "@/composables/useDefaultLayout";
import { onMounted, ref } from "vue";

export default {
  components: {
    HeaderNavigation,
    SideBarNavigation,
    BottomNavigation,
  },
  setup() {
    let contentContainer;
    const isShowBackToTop = ref(false);

    onMounted(() => {
      contentContainer = document.getElementById("content-container");

      contentContainer.addEventListener("scroll", () => {
        if (
          contentContainer.scrollTop + contentContainer.clientHeight >=
          contentContainer.scrollHeight - 25
        ) {
          isReachedBottom.value = true;
        } else {
          isReachedBottom.value = false;
        }

        if (contentContainer.scrollTop >= 100) isShowBackToTop.value = true;
        else isShowBackToTop.value = false;
      });
    });

    function onBackToTop() {
      contentContainer.scrollTop = 0;
    }

    return { isReachedBottom, isShowBackToTop, onBackToTop };
  },
};
</script>

<style lang="scss">
#content-container {
  padding-bottom: env(SAFE-AREA-INSET-BOTTOM, 100px);
  // margin-bottom: 100px;
}
</style>
