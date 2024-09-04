<template>
  <div class="" style="max-width: 180px">
    <router-link
      :to="{ name: 'Details', params: { type: props.type, id: props.imdbID } }"
      class="text-decoration-none text-body fw-semibold"
    >
      <div class="overflow-hidden w-100">
        <img
          :src="
            !props.imageURL
              ? 'https://via.placeholder.com/180x270'
              : props.imageURL
          "
          alt=""
          class="card-image border-0 rounded-2"
          style="width: 100%; aspect-ratio: 2 / 3"
        />
      </div>
      <div
        class="overflow-hidden text-wrap fs-6 d-none d-xl-block text-center mt-1"
      >
        {{ props.title }}
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    imdbID: [String, Number],
    imageURL: String,
    title: String,
  },
  setup(props) {
    return { props };
  },
};
</script>
