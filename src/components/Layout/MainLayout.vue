<template>
  <div
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
        <div v-else></div>
      </Content>
    </div>
  </div>
</template>

<script>
import Navbar from "./Partials/Navbar.vue";
import Sidebar from "./Partials/Sidebar.vue";
import Content from "./Partials/Content.vue";
import { ref } from "vue";
import Dashboard from "../Dashboard.vue";
export default {
  components: {
    Navbar,
    Sidebar,
    Content,
    Dashboard,
  },

  setup() {
    const showSidebar = ref(true);
    const sidebarClass = ref("");
    const ContentContext = ref("");
    return { showSidebar, ContentContext, sidebarClass };
  },
  methods: {
    sidebarToggle(e) {
      this.showSidebar = !this.showSidebar;
      if (this.showSidebar) {
        this.sidebarClass = e;
      } else {
        this.sidebarClass = e;
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
