<template>
  <div class="flex flex-row w-full h-screen overflow-y-scroll flex-grow">
    <div>
      <Sidebar
        :Name="dataName"
        :Animation="
          showSidebar
            ? 'animate__fadeInLeft drawer-open'
            : 'animate__fadeOutLeft '
        "
      />
    </div>
    <div class="w-full">
      <Navbar @openSidebar="sidebarToggle" />
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script>
import { RouterView, useRouter } from "vue-router";
import Navbar from "./Partials/Navbar.vue";
import Sidebar from "./Partials/Sidebar.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
// import jwtDecode from "jwt-decode";
import { jwtDecode } from "jwt-decode";

export default {
  components: {
    Navbar,
    Sidebar,
    RouterView,
  },

  setup() {
    const showSidebar = ref(true);
    const router = useRouter();
    const decodedToken = ref(null);
    const dataName = ref(null);

    const token = localStorage.getItem("token");

    const validateToken = async () => {
      try {
        await axios.post("https://localhost:7117/api/Account/Validate", {
          token: token,
        });
        decodedToken.value = jwtDecode(token);
        dataName.value = decodedToken.value.name;
      } catch (error) {
        if (error.response) {
          if (error.response.data.errors) {
            alert(error.response.data.errors.token[0]);
          } else {
            alert(error.response.data.title);
          }
        } else {
          alert("An error occurred: " + error.message);
        }
        router.push({ name: "Login" });
        localStorage.removeItem("token");
      }
    };

    onMounted(() => {
      if (!token) {
        router.push({ name: "Login" });
      } else {
        validateToken();
      }
    });

    const sidebarToggle = () => {
      showSidebar.value = !showSidebar.value;
    };

    return { showSidebar, decodedToken, sidebarToggle, dataName };
  },
};
</script>

<style scoped></style>
