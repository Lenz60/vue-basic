<template>
  <div class="drawer drawer-open">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-side">
      <label
        for="my-drawer"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul
        class="menu bg-neutral-content text-base-content h-full w-80 pt-10 border-2 border-green-500"
      >
        <div class="border-2 border-blue-600 p-2 flex flex-row">
          <div class="avatar border-2 border-green-500">
            <div
              class="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2"
            >
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <div class="p-2">
            <h2 class="text-lg font-bold">Admin</h2>
            <p class="text-sm"></p>
          </div>
        </div>
        <div class="border-2 border-green-500 mt-12 p-2 text-primary-content">
          <li
            @click="selectMenu('Dashboard')"
            class="border-2 border-green-600"
          >
            <div class="flex flex-row">
              <PresentationChartLineIcon
                class="border-2 border-yellow-400 w-7 h-fit hover:bg-none"
              />
              <a>Dashboard</a>
            </div>
          </li>
          <li @click="selectMenu('Account')" class="border-2 border-green-600">
            <div class="flex flex-row">
              <UsersIcon
                class="border-2 border-yellow-400 w-7 h-fit hover:bg-none"
              />
              <a>Account</a>
            </div>
          </li>
          <li
            @click="selectMenu('University')"
            class="border-2 border-green-600"
          >
            <div class="flex flex-row">
              <BuildingLibraryIcon
                class="border-2 border-yellow-400 w-7 h-fit hover:bg-none"
              />
              <a>University</a>
            </div>
          </li>
        </div>
        <!-- Sidebar content here -->
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, onUpdated } from "vue";
import { useRouter } from "vue-router";
import {
  BuildingLibraryIcon,
  PresentationChartLineIcon,
  UsersIcon,
} from "@heroicons/vue/16/solid";
export default {
  props: ["Toggle"],
  components: {
    PresentationChartLineIcon,
    BuildingLibraryIcon,
    UsersIcon,
  },
  setup(props) {
    const router = useRouter();
    console.log(props.Toggle);
    return { router };
  },
  methods: {
    selectMenu(menu) {
      // console.log(menu);

      // Vue Route style routing
      this.router.push({ name: menu });

      // Emit Style routing
      // this.$emit("selected", menu);
    },
  },
};
</script>

<style scoped></style>
