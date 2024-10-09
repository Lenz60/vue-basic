<template>
  <!-- v Emit style routing -->
  <!-- <div
    class="flex flex-row border-2 border-blue-400 w-full h-full overflow-y-hidden"
  >
    <div class="border-2 border-black h-full">
      <Sidebar
        @selected="GetContent"
        v-if="showSidebar"
        :Toggle="sidebarClass"
      />
    </div>
    <div class="border-2 border-yellow-500 h-screen w-full">
      <Navbar @openSidebar="sidebarToggle" />
      <Content class="h-full">
        <div v-if="ContentContext == 'Dashboard'">
          <Dashboard />
        </div>
        <div v-else-if="ContentContext == 'Account'">
          <Account />
        </div>
        <div v-else-if="ContentContext == 'University'">
          <University />
        </div>
        <div v-else></div>
      </Content>
    </div>
  </div> -->

  <!-- v vue-router Style routing -->
  <div
    class="flex flex-row border-2 border-blue-400 w-full h-full overflow-y-scroll"
  >
    <div class="border-2 border-black h-full">
      <Sidebar v-if="showSidebar" />
    </div>
    <div class="border-2 border-yellow-500 h-screen w-full">
      <Navbar @openSidebar="sidebarToggle" />
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import Navbar from "./Partials/Navbar.vue";
import Sidebar from "./Partials/Sidebar.vue";
import Content from "./Partials/Content.vue";
import { ref } from "vue";
import Dashboard from "../Pages/Dashboard.vue";
import Account from "../Pages/Account.vue";
import University from "../Pages/University.vue";
export default {
  components: {
    Navbar,
    Sidebar,
    Content,
    Dashboard,
    Account,
    University,
    RouterView,
  },

  setup() {
    const showSidebar = ref(false);
    const sidebarClass = ref("");
    const ContentContext = ref("");
    return { showSidebar, ContentContext, sidebarClass };
  },
  methods: {
    sidebarToggle(e) {
      this.showSidebar = !this.showSidebar;

      // Emit style routing
      if (this.showSidebar) {
        this.sidebarClass = e;
      } else {
        this.sidebarClass = "";
      }
      //   console.log(this.sidebarClass);
      //   console.log(e);
    },
    GetContent(menu) {
      console.log(menu);
      this.ContentContext = menu;
    },
  },
};
</script>

<style lang="scss" scoped></style>
