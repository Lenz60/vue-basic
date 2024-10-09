<template>
  <div class="border-2 border-green-700 w-full h-full flex flex-col p-5">
    <div class="border-2 border-blue-600 p-5">
      <h1 class="text-xl font-medium">University Table</h1>
    </div>
    <!-- ?Table  -->

    <div
      class="card flex flex-col shadow-xl border-2 border-red-800 p-5 mt-5 w-full h-full"
    >
      <div
        onclick="universityModal.showModal()"
        class="mb-2 btn btn-primary hover:text-primary-content hover:btn-secondary w-fit h-fit"
      >
        <PlusIcon
          class="w-8 h-fit text-neutral-content hover:text-primary-content"
        ></PlusIcon>
      </div>
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
    <Modal
      Id="universityModal"
      Class="modal"
      Context="University"
      @data-added="refreshTable"
    >
    </Modal>
  </div>
</template>

<script>
import { onBeforeMount, onMounted, ref } from "vue";
import axios from "axios";
import { PlusIcon } from "@heroicons/vue/16/solid";
import Modal from "./Partials/Modal.vue";
export default {
  components: { PlusIcon, Modal },
  setup() {
    const data2 = ref([]);
    const data3 = ref([]);
    let dataTableInstance = null;
    let dataTableInstance2 = null;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7117/api/University"
        );
        data2.value = response.data.data;
      } catch (error) {
        if (error.response) {
          console.error(
            "Error fetching data:",
            error.response.status,
            error.response.data
          );
        } else if (error.request) {
          console.error(
            "Error fetching data: No response received",
            error.request
          );
        } else {
          console.error("Error fetching data:", error.message);
        }
      }
    };

    onMounted(() => {
      fetchData();
    });
    // onBeforeMount(() => {
    //   if (dataTableInstance) {
    //     dataTableInstance.destroy(true);
    //   }
    // });
    return { data2, data3, fetchData };
  },
  methods: {
    refreshTable() {
      // console.log("Data has been added!");
      this.fetchData();
    },
  },
};
</script>

<style scoped></style>
