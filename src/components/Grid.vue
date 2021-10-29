<template>
  <ag-grid-vue
    style=""
    class="ag-theme-alpine-dark grid"
    :columnDefs="columnDefs"
    :rowData="rowData"
    :paginationAutoPageSize="true"
    :pagination="true"
    :rowSelection="rowSelection"
    @grid-ready="onGridReady"
    @selection-changed="onSelectionChanged"
  ></ag-grid-vue>
</template>

<script lang="ts">
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import { AgGridVue } from "ag-grid-vue3";
import { reactive, onMounted } from "vue";
import router from "@/router";

interface Row {
  title: string;
  id: number;
  userId: number;
  body: string;
}

export default {
  name: "Grid",
  components: {
    AgGridVue,
  },

  created() {
    this.fetchPosts();
  },
  setup() {
    let rowData = reactive([]);

    return {
      columnDefs: [
        {
          headerName: "ID",
          field: "ID",
          cellStyle: { "text-align": "left" },
          flex: 1,
         
        },
        {
          headerName: "UserId",
          field: "userId",
          cellStyle: { "text-align": "left" },
          flex: 1,
        },
        {
          headerName: "Title",
          field: "title",
          cellStyle: { "text-align": "left" },
          flex: 3,
        },
      ],
      rowData,
      rowSelection: "single",
      gridApi: null,
      columnApi: null,
    };
  },

  methods: {
    onSelectionChanged() {
      const selectedRows = this.gridApi.getSelectedRows();
      router.push({ name: "Post", params: { id: selectedRows[0].ID } });
    },
    onGridReady(params) {
      this.gridApi = params.api;
    },

    fetchPosts() {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((result) => result.json())
        .then((remoteRowData) => {
          remoteRowData.forEach((row: Row) => {
            const rowDataValues = {
              ID: row.id,
              userId: row.userId,
              title: row.title,
              rowStyles: { width: "100%" },
            };
            this.rowData.push(rowDataValues);
          });
        });
    },
  },
};
</script>

<style lang="scss">
@import "~ag-grid-community/dist/styles/ag-grid.css";
@import "~ag-grid-community/dist/styles/ag-theme-alpine.css";

.grid{
  width: 90%;
  height: 80vh;
  @media screen and (min-width: 960px) {
  .grid {
    width: 70%;
  }
}
}
</style>
