<template>
  <div class="post">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="post" class="body">
      <h1>{{ post.title }}</h1>
      <div class="img-container">
        <img :src="img" alt="random post img" />
      </div>
      <div class="body-container">
        <p>{{ post.body }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Post",
  data() {
    return {
      img: null,
      loading: false,
      post: null,
    };
  },
  created() {
    this.fetchPost();
  },
  watch: {
    // call again the method if the route changes
    $route: "fetchPost",
  },
  methods: {
    fetchPost() {
      this.loading = true;
      fetch(
        "https://jsonplaceholder.typicode.com/posts/" + this.$route.params.id
      )
        .then((res) => res.json())
        .then((post) => {
          this.loading = false;
          this.post = post;
          this.img = "https://source.unsplash.com/random/700*400";
        });
    },
  },
};
</script>

<style scoped>
.post {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
h1 {
  text-transform: uppercase;
}
img {
  width: auto;
  height: 50vh;
}
.body-container {
  width: 50vw;
  text-align: left;
  margin-top: 4rem;
}
</style>
