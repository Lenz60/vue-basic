<template>
  <div class="border-2 border-green-700 w-full h-full flex flex-col">
    <div
      class="items-center justify-center text-center border-2 border-blue-600"
    >
      <h1>Header</h1>
    </div>
    <!-- ?Table  -->
    <div class="border-2 border-red-800">
      <!-- <DataTable id="univTable" :data="data"   class="table-zebra">
        <thead>
          <tr>
            <th scope="col">A</th>
            <th scope="col">B</th>
          </tr>
        </thead>
      </DataTable> -->
      <table id="univTable"></table>
    </div>
  </div>
</template>

<script>
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";
import { onBeforeMount, onMounted } from "vue";
import $ from "jquery";
export default {
  components: {
    DataTable,
  },
  setup() {
    DataTable.use(DataTablesCore);
    const data = [
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
      [9, 10],
    ];
    let dataTableInstance = null;
    onMounted(() => {
      dataTableInstance = $("#univTable").DataTable({
        data: data,
        columns: [{ title: "A" }, { title: "B" }],
        paging: false,
      });
    });
    onBeforeMount(() => {
      if (dataTableInstance) {
        dataTableInstance.destroy(true);
      }
    });
    return { data, dataTableInstance };
  },
};
</script>

<style scoped>
@import "datatables.net-bs5";
@import "datatables.net-dt";
</style>
