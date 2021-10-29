<template>
  <ag-grid-vue
    style="width: 500px; height: 500px"
    class="ag-theme-alpine"
    :columnDefs="columnDefs"
    :rowData="rowData"
    :pagination="true"
  >
  </ag-grid-vue>
</template>

<script>
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3";
import { reactive, onMounted } from "vue";

export default {
  name: "Grid",
  components: {
    AgGridVue,
  },
  setup() {
    let rowData = reactive([]);

    onMounted(() => {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((result) => result.json())
        .then((remoteRowData) => {
          console.log(remoteRowData);
          remoteRowData.forEach((row) => {
            rowData.push({ ID: row.id, userId: row.userId, title: row.title });
          });
        });
    });
    return {
      columnDefs: [
        { headerName: "ID", field: "ID" },
        { headerName: "UserId", field: "userId" },
        { headerName: "Title", field: "title" },
      ],
      rowData,
    };
  },
};
</script>

<style lang="scss">
@import "~ag-grid-community/dist/styles/ag-grid.css";
@import "~ag-grid-community/dist/styles/ag-theme-alpine.css";
</style>
