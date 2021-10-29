<template>
  <header>
    <h1><router-link to="/">BLOG POSTS</router-link></h1>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
});
</script>

<style scoped lang="scss">
header {
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  background-color: #282828;
}
a {
  text-decoration: none;
  color: #f8f8f8;
}
</style>
