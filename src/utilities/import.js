import { defineAsyncComponent } from "vue";

export function importGlobalComponent(app) {
  app.component(
    "auth-layout",
    defineAsyncComponent(() => import("@/layout/auth-layout.vue"))
  );

  app.component(
    "default-layout",
    defineAsyncComponent(() => import("@/layout/default-layout.vue"))
  );

  app.component(
    "details-layout",
    defineAsyncComponent(() => import("@/layout/details-layout.vue"))
  );
}
