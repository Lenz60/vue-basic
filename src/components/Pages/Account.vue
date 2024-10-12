<template>
  <div class="flex flex-col p-5">
    <div class="p-5">
      <h1 class="text-xl font-medium">Account Table</h1>
    </div>
    <!-- ?Table  -->

    <div class="card shadow-xl p-5 m-5">
      <Tables
        :Datas="data2"
        Context="Account"
        @refresh-table="refreshTable"
      ></Tables>
      <!-- <div class="overflow-x-auto border-2 border-green-400"> -->
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
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { onBeforeMount, onUnmounted, onMounted, ref } from "vue";
import Tables from "./Partials/Tables.vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { jwtDecode } from "jwt-decode";
export default {
  components: { Tables },
  setup() {
    const data2 = ref([]);
    const data3 = ref([]);
    let dataTableInstance = null;
    let dataTableInstance2 = null;
    const router = useRouter();
    const token = localStorage.getItem("token");
    const decodedToken = ref(null);

    const validateToken = async () => {
      try {
        await axios.post("https://localhost:7117/api/Account/Validate", {
          token: token,
        });
        decodedToken.value = jwtDecode(token);
      } catch (error) {
        if (error.response) {
          if (error.response.data.errors) {
            // console.log(error.response.data.errors.token[0]);
            alert(error.response.data.errors.token[0]);
          } else {
            alert(error.response.data.title);
          }
        } else {
          alert("An error occurred: " + error.message);
        }
        // console.log(error.response.data);
        router.push({ name: "Login" });
        localStorage.removeItem("token");
      }
    };

    const fetchData = async () => {
      try {
        const response = await axios.get("https://localhost:7117/api/Account", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
    };

    onUnmounted(() => {
      console.log("Component has been unmounted");
    });

    onMounted(async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push({ name: "Login" });
      } else {
        validateToken();
        fetchData();
      }
    });

    // onBeforeMount(() => {
    //   if (dataTableInstance) {
    //     dataTableInstance.destroy(true);
    //   }
    // });
    return { data2, data3, router, decodedToken };
  },
};
</script>

<style lang="scss" scoped></style>
