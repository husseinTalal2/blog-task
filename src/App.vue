<template>
  <Header />
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Header from "./components/Header.vue"; // @ is an alias to /src

export default defineComponent({
  name: "App",
  components: {
    Header,
  },
});
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
}
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
}

</style>
