<template>
  <div class="flex flex-col p-5">
    <div class="p-5">
      <h1 class="text-xl font-medium">University Table</h1>
    </div>
    <!-- ?Table  -->

    <div class="card flex flex-col shadow-xl p-5 mt-5 w-full h-full">
      <div class="w-full flex flex-col justify-center items-end text-center">
        <div
          @click="showModal"
          class="btn btn-primary hover:text-neutral-content hover:btn-secondary w-fit h-fit"
        >
          <h1>Add University</h1>
          <!-- <PlusIcon
            class="w-8 h-fit text-neutral-content hover:text-primary-content"
          ></PlusIcon> -->
        </div>
      </div>
      <div class="overflow-x-auto">
        <!-- <table class="table">
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
        </table> -->
        <Tables
          :Datas="data2"
          Context="University"
          @refresh-table="refreshTable"
        ></Tables>
      </div>
    </div>
    <Modal
      Id="universityModal"
      v-if="toggleAddModal"
      Class="modal modal-open"
      Context="University"
      ContextTitle="Add"
      @data-added="refreshTable"
      @modalClosed="closeModal"
    >
    </Modal>
  </div>
</template>

<script>
import { onBeforeMount, onMounted, ref } from "vue";
import axios from "axios";
import { PlusIcon } from "@heroicons/vue/16/solid";
import Modal from "./Partials/Modal.vue";
import Tables from "./Partials/Tables.vue";
import { useRouter } from "vue-router";
import { jwtDecode } from "jwt-decode";
export default {
  components: { PlusIcon, Modal, Tables },
  setup() {
    const data2 = ref([]);
    const data3 = ref([]);
    let dataTableInstance = null;
    let dataTableInstance2 = null;
    const toggleAddModal = ref(false);
    const token = localStorage.getItem("token");
    const router = useRouter();
    const decodedToken = ref(null);

    const validateToken = async () => {
      try {
        await axios.post("https://localhost:7117/api/Account/Validate", {
          token: token,
        });
        decodedToken.value = jwtDecode(token);
      } catch (error) {
        alert(error.response.data.message);
        router.push({ name: "Login" });
        localStorage.removeItem("token");
      }
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7117/api/University",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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
      if (!token) {
        router.push({ name: "Login" });
      } else {
        // validateToken();
        fetchData();
      }
    });
    // onBeforeMount(() => {
    //   if (dataTableInstance) {
    //     dataTableInstance.destroy(true);
    //   }
    // });
    return { data2, data3, fetchData, toggleAddModal, router, decodedToken };
  },
  methods: {
    showModal() {
      this.toggleAddModal = !this.toggleAddModal;
    },
    refreshTable() {
      // console.log("Data has been added!");
      this.fetchData();
    },
    closeModal() {
      this.toggleAddModal = false;
    },
  },
};
</script>

<style scoped></style>
