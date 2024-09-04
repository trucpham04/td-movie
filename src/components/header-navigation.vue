<template>
  <nav class="navbar navbar-expand-lg user-select-none">
    <div class="container-fluid">
      <!-- Start: Brand icon -->
      <div class="navbar-brand">
        <router-link
          to="/"
          class="link-underline-opacity-0"
          style="text-decoration: none"
        >
          <img
            src="../assets/logo.png"
            alt=""
            class="me-3"
            style="width: 40px; height: 40px"
          />
          <span class="text-body fw-bold">Movie</span>
        </router-link>
      </div>
      <!-- End: Brand icon -->

      <!-- Start: Menu -->
      <div>
        <ul class="nav nav-pills gap-2">
          <!-- Start: Search button on mobile -->
          <li class="d-block d-lg-none">
            <button
              class="btn nav-item md-btn icon-btn btn-outline-secondary border-0"
              data-bs-toggle="modal"
              data-bs-target="#search-modal"
            >
              <i class="material-symbols-rounded text-body"> search </i>
            </button>

            <button
              id="search-modal-close-btn"
              data-bs-dismiss="modal"
              data-bs-target="#search-modal"
              class="d-none"
            ></button>
          </li>
          <!-- End: Search button -->

          <li class="nav-item dropdown">
            <button
              class="btn md-btn icon-btn btn-outline-secondary border-0"
              data-bs-toggle="dropdown"
            >
              <i class="material-symbols-rounded text-body">person</i>
            </button>

            <!-- Start: Profile dropdown -->
            <ul
              class="dropdown-menu p-3 overflow-hidden"
              style="
                width: 300px;
                left: 40px;
                transform: translate(-100%, 0);
                margin-top: 12px;
              "
            >
              <!-- Start: User info -->
              <li v-if="user">
                <div class="d-flex align-items-center fw-medium">
                  <div class="me-3">
                    <router-link
                      :to="{ name: 'Settings', params: {} }"
                      class="text-decoration-none text-body"
                    >
                      <img
                        :src="
                          user.photoURL || 'https://via.placeholder.com/150'
                        "
                        alt=""
                        class="rounded-circle"
                        style="width: 40px; height: 40px"
                    /></router-link>
                  </div>
                  <div>
                    <div class="fw-semibold">{{ user.displayName }}</div>
                    <div>{{ user.email }}</div>
                  </div>
                </div>
              </li>
              <!-- Start: User info -->

              <li
                v-if="user"
                @click="onSignOut"
                class="mt-2 dropdown-item rounded-1 px-2"
              >
                <router-link to="/" class="text-decoration-none text-body">
                  <div class="d-flex align-items-center text-danger">
                    <i class="material-symbols-rounded me-3 p-2 ps-0">
                      logout
                    </i>
                    <span>Logout</span>
                  </div>
                </router-link>
              </li>

              <li v-else class="mt-2 rounded-1 px-2 mb-3">
                <div class="d-flex justify-content-around gap-2">
                  <router-link
                    :to="{ name: 'Login', params: {} }"
                    class="text-decoration-none text-body w-50"
                  >
                    <div
                      class="w-100 text-center border-1 bg-primary py-2 rounded-3"
                      style="cursor: pointer"
                    >
                      Sign In
                    </div>
                  </router-link>

                  <router-link
                    :to="{ name: 'Register', params: {} }"
                    class="text-decoration-none text-body w-50"
                  >
                    <div
                      class="w-100 text-center border-1 bg-primary py-2 rounded-3"
                      style="cursor: pointer"
                    >
                      Sign Up
                    </div>
                  </router-link>
                </div>
              </li>

              <!-- <li class="mt-2">
                <hr class="dropdown-divider" />
              </li>

              <li class="mt-2 dropdown-item rounded-1 px-2">
                <router-link to="/" class="text-decoration-none text-body">
                  <div class="d-flex align-items-center">
                    <i class="material-symbols-rounded me-3 p-2 ps-0">
                      feedback
                    </i>
                    <span>Feedback</span>
                  </div>
                </router-link>
              </li>

              <li class="mt-2 dropdown-item rounded-1 px-2">
                <router-link to="/" class="text-decoration-none text-body">
                  <div class="d-flex align-items-center">
                    <i class="material-symbols-rounded me-3 p-2 ps-0"> mail </i>
                    <span>About me</span>
                  </div>
                </router-link>
              </li> -->
            </ul>
            <!-- End: Profile dropdown -->
          </li>
        </ul>
      </div>
      <!-- End: Menu -->

      <!-- Start: Search bar -->
      <div
        class="position-absolute top-50 start-50 translate-middle h-100 w-50 d-flex justify-content-center align-items-center d-none d-lg-flex"
        style="max-width: 32rem"
      >
        <div class="container p-0" style="">
          <input
            type="text"
            v-model="searchText"
            class="form-control rounded-pill ps-4 fw-semibold border-0"
            style="
              padding-right: calc(1rem + 42px);
              background-color: #36307577;
            "
            v-on:keyup.enter="search"
          />
          <div
            class="search-icon md-btn icon-btn position-absolute end-0 top-50"
            style="
              outline: none !important;
              box-shadow: none;
              margin-right: 0.5rem;
              transform: translate(0, -50%);
            "
          >
            <i
              v-if="searchText"
              @click="deleteSearch"
              class="material-symbols-rounded"
            >
              close
            </i>
            <i v-else class="material-symbols-rounded"> search </i>
          </div>
        </div>
      </div>
      <!-- End: Search bar -->
    </div>
  </nav>

  <!-- Start: Modal search bar -->
  <div
    class="modal fade"
    id="search-modal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header d-block">
          <div class="container-fluid p-0 position-relative">
            <input
              type="text"
              v-model="searchText"
              autofocus
              id="search-bar"
              v-on:keyup.enter="search"
              class="form-control rounded-pill ps-4 fw-semibold"
              style="padding-right: calc(1rem + 42px)"
            />

            <div
              class="search-icon md-btn icon-btn position-absolute top-50 end-0 me-2"
              style="transform: translate(0, -50%)"
            >
              <i
                v-if="searchText"
                @click="deleteSearch"
                class="material-symbols-rounded"
              >
                close
              </i>
              <i v-else class="material-symbols-rounded"> search </i>
            </div>
          </div>
          <div class="mt-3">
            <div class="d-flex justify-content-between fw-semibold">
              <div>Last searches</div>
              <div class="d-flex align-items-end" style="cursor: pointer">
                Clear history
                <i class="material-symbols-rounded fs-5 ms-1"> close </i>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-body"></div>
      </div>
    </div>
  </div>
  <!-- End: Modal search bar -->
</template>

<script>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuth } from "@/composables/useAuth";

export default {
  setup() {
    const { getUser, signOut } = useAuth();
    const searchText = ref("");
    const router = useRouter();
    const route = useRoute();
    const { user } = getUser();

    let searchModal;
    let searchBar;
    let searchModalCloseButton;

    searchText.value = route.params.query;

    async function onSignOut() {
      user.value = await signOut();

      router.push({ name: "Home", params: {} });
    }

    onMounted(() => {
      searchModal = document.getElementById("search-modal");
      searchBar = document.getElementById("search-bar");
      searchModalCloseButton = document.getElementById(
        "search-modal-close-btn"
      );

      if (searchModal) {
        searchModal.addEventListener("shown.bs.modal", () => {
          if (searchBar) {
            searchBar.focus();
          }
        });
      } else {
        console.warn("Search modal element not found");
      }
    });

    function hideModal() {
      searchModalCloseButton.click();
      // document.body.classList.remove("modal-open");
      // document
      //   .querySelectorAll(".modal-backdrop")
      //   .forEach((backdrop) => backdrop.remove());
    }

    function deleteSearch() {
      searchText.value = "";
      // hideModal();
      searchBar.focus();
    }

    function search() {
      if (searchText.value) {
        hideModal();

        searchText.value = searchText.value.trim();
        let query = encodeURIComponent(searchText.value);

        router.push({ name: "Search", params: { query: query } });
      }
    }

    return { searchText, search, deleteSearch, user, onSignOut };
  },
};
</script>

<style lang="scss" scoped></style>
