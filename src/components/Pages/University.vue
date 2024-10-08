<template>
  <div class="border-2 border-green-700 w-full h-full flex flex-col">
    <div
      class="items-center justify-center text-center border-2 border-blue-600"
    >
      <h1>Header</h1>
    </div>
    <!-- ?Table  -->
    <div class="border-2 border-red-800">
      <DataTable :data="data" class="table-zebra">
        <thead>
          <tr>
            <th>A</th>
            <th>B</th>
          </tr>
        </thead>
      </DataTable>
    </div>
  </div>
</template>

<script>
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";
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
    return { data };
  },
};
</script>

<style scoped>
@import "datatables.net-bs5";
@import "datatables.net-dt";
</style>
