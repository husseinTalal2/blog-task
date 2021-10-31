<template>
  <div class="post">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="post" class="body">
      <h1>{{ post.title }}</h1>
      <div class="post-info">
        <span>
          <img class="avatar" src="../assets/avatar.jpg" alt="avatar" />
        </span>
        <p id="name">John Doe</p>
        <span id="date"> Sep 17 </span>
      </div>
      <div class="img-container">
        <img :src="img" alt="random post img" />
      </div>
      <!-- duplicated the post body to fill the space -->
      <div class="body-container">
        <p>{{ post.body }} {{ post.body }} {{ post.body }}</p>
        <p>{{ post.body }} {{ post.body }}</p>
        <p>{{ post.body }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Post",
  data() {
    return {
      img: "",
      loading: false,
      post: {
        id: 0,
        userId: 0,
        body: "",
        title: "",
      },
    };
  },
  created() {
    this.fetchPost();
  },
  watch: {
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
          this.img = "https://source.unsplash.com/random";
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
  width: 100%;
  height: auto;

  margin-block: 1rem;
}
.body-container {
  width: 100%;
  text-align: left;
  margin-top: 4rem;
}
.img-container {
  overflow: hidden;
  height: 35vh;
}
.post-info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
#name {
  color: #f3726b;
  margin-inline: 1rem;
}
#date {
  color: #787878;
}
.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid #f3726b;
}
@media screen and (min-width: 1200px) {
  .body {
    width: 50vw;
  }
}
@media screen and (min-width: 760px) {
  .body {
    width: 70vw;
  }
  .body-container {
    font-size: 1.2rem;
  }
}
@media screen and (max-width: 760px) {
  .body {
    width: 90vw;
  }
  .img-container {
    overflow: hidden;
    max-height: 50vh;
  }
  h1 {
    font-size: 1.5rem;
  }
}
</style>
