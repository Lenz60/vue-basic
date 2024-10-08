<template>
  <div
    class="flex flex-auto border-2 border-red-600 overflow-y-hidden"
    data-theme="corporate"
  >
    <!-- <Login></Login> -->
    <RouterView></RouterView>
    <!-- <Dashboard
      :Hari="Days"
      Text="Text from App"
      Color="blue-500"
      :Role="Role"
      class="border-2 border-green-500 m-2"
    >
      <p>This is from App</p>
    </Dashboard> -->
  </div>
</template>

<script>
import { onMounted } from "vue";
import Login from "./components/Auth/Login.vue";
// import Dashboard from "./components/Dashboard.vue";
import { RouterLink, RouterView } from "vue-router";
export default {
  components: {
    Login,
    // Dashboard,
    RouterLink,
    RouterView,
  },
  setup() {
    // onMounted(() => {
    //   alert("Hello world");
    // });
    const Role = "Admin";
    const Days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thurstday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    return { Days, Role };
  },
};
</script>

<style lang="scss" scoped></style>
