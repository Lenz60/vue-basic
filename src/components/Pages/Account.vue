<template>
  <div class="border-2 border-green-700 w-full h-full flex flex-col p-5">
    <div class="border-2 border-blue-600 p-5">
      <h1 class="text-xl font-medium">Account Table</h1>
    </div>
    <!-- ?Table  -->

    <div class="card shadow-xl border-2 border-red-800 p-5 m-5">
      <div class="overflow-x-auto border-2 border-green-400">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th>#</th>
              <th>Id</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in data2" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ data.id }}</td>
              <td>{{ data.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, onMounted, ref } from "vue";
import axios from "axios";
export default {
  components: {},
  setup() {
    const data2 = ref([]);
    const data3 = ref([]);
    let dataTableInstance = null;
    let dataTableInstance2 = null;

    onMounted(async () => {
      try {
        const response = await axios.get(
          "https://localhost:7117/api/University"
        );
        // console.log(response.data);
        data2.value = response.data.data;
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error(
            "Error fetching data:",
            error.response.status,
            error.response.data
          );
        } else if (error.request) {
          // The request was made but no response was received
          console.error(
            "Error fetching data: No response received",
            error.request
          );
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error fetching data:", error.message);
        }
      }
    });
    // onBeforeMount(() => {
    //   if (dataTableInstance) {
    //     dataTableInstance.destroy(true);
    //   }
    // });
    return { data2, data3 };
  },
};
</script>

<style lang="scss" scoped></style>
