<template>
  <div class="px-5 mx-auto mb-5" style="max-width: 36rem">
    <img src="../assets/logo.png" alt="" style="width: 100px" class="mb-3" />
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
  </div>
</template>

<script>
export default {
  setup() {},
  props: ["title", "description"],
};
</script>
