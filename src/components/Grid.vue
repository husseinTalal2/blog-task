<template>
  <ag-grid-vue
    style=""
    class="ag-theme-alpine-dark grid"
    :columnDefs="columnDefs"
    @grid-ready="onGridReady"
    :rowData="rowData"
    paginationAutoPageSize="true"
    pagination="true"
    rowSelection="single"
    @selection-changed="onSelectionChanged"
  ></ag-grid-vue>
</template>

<script>
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import { AgGridVue } from "ag-grid-vue3";
import { reactive } from "vue";
import router from "@/router";

export default {
  name: "Grid",
  components: {
    AgGridVue,
  },

  data() {
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
      gridApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 100,
      },
      rowData: reactive([]),
    };
  },

  methods: {
    onSelectionChanged() {
      const selectedRows = this.gridApi.getSelectedRows();
      router.push({ name: "Post", params: { id: selectedRows[0].ID } });
    },
    onGridReady(params) {
      this.fetchPosts();
      this.gridApi = params.api;
    },

    fetchPosts(){
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((result) => result.json())
        .then((remoteRowData) => {
          remoteRowData.forEach((row) => {
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

.grid {
  width: 90%;
  height: 80vh;
  @media screen and (min-width: 960px) {
    .grid {
      width: 70%;
    }
  }
}
</style>
