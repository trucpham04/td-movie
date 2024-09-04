// import { firebaseAuth } from "@/configs/firebase";
import { createRouter, createWebHistory } from "vue-router";

// function authBeforeEnter(to, from, next) {
//   const user = firebaseAuth.currentUser;

//   if (!user) next({ name: "Login", params: {} });
//   else next();
// }

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "not-found" */ "../views/not-found-view.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      layout: "auth",
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login-view.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      layout: "auth",
    },
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/register-view.vue"),
  },
  {
    path: "/",
    name: "Home",
    meta: {
      layout: "default",
    },
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/home-view.vue"),
  },
  {
    path: "/search/:query",
    name: "Search",
    meta: {
      layout: "default",
    },
    component: () =>
      import(/* webpackChunkName: "search" */ "../views/search-view.vue"),
  },
  {
    path: "/details/:type/:id",
    name: "Details",
    meta: {
      layout: "details",
    },
    component: () =>
      import(/* webpackChunkName: "details" */ "../views/details-view.vue"),
  },
  {
    path: "/explore",
    name: "Explore",
    meta: {
      layout: "default",
    },
    component: () =>
      import(/* webpackChunkName: "explore" */ "../views/explore-view.vue"),
  },
  {
    path: "/library",
    name: "Library",
    meta: {
      layout: "default",
    },
    component: () =>
      import(/* webpackChunkName: "library" */ "../views/library-view.vue"),
  },
  {
    path: "/settings",
    name: "Settings",
    meta: {
      layout: "default",
    },
    component: () =>
      import(/* webpackChunkName: "library" */ "../views/settings-view.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
