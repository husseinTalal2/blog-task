<template>
  <div class="home">
    <Grid />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Grid from "../components/Grid.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {
    Grid,
  },
});
</script>
