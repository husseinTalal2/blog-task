<template>
  <ag-grid-vue
    style="width: 60vw; height: 80vh"
    class="ag-theme-alpine-dark"
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
  setup() {
    let rowData = reactive([]);

    onMounted(() => {
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
            rowData.push(rowDataValues);
          });
        });
    });
    return {
      columnDefs: [
        {
          headerName: "ID",
          field: "ID",
          cellStyle: { "text-align": "left" },
          flex: 1,
          cellRenderer: function (params: { value: string }) {
            return `<div v-on:click="router.push({ name: 'post', params: { userId: '123' } })">${params.value}</div>`;
          },
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
    onGridReady(params: any) {
      this.gridApi = params.api;

    },
  },
};
</script>

<style lang="scss">
@import "~ag-grid-community/dist/styles/ag-grid.css";
@import "~ag-grid-community/dist/styles/ag-theme-alpine.css";
</style>
