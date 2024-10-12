<template>
  <div class="drawer shadow-xl" :class="Animation">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-side">
      <label
        for="my-drawer"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul class="menu bg-neutral-content text-base-content h-full w-80 pt-10">
        <div class="p-2 flex flex-row">
          <div class="avatar">
            <div
              class="ring-secondary ring-offset-base-100 w-10 rounded-full ring ring-offset-2"
            >
              <img src="https://i.pravatar.cc/40" />
            </div>
          </div>
          <div class="p-1">
            <h2 class="text-lg ml-2 font-bold">{{ Name }}</h2>
          </div>
        </div>
        <div class="mt-12 p-2 text-primary-content">
          <li @click="selectMenu('Dashboard')" class="text-primary-content">
            <a
              class="flex flex-row"
              :class="{ active: route.path === '/dashboard' }"
            >
              <PresentationChartLineIcon class="w-7 h-fit hover:bg-none" />
              <a>Dashboard</a>
            </a>
          </li>
          <li @click="selectMenu('Account')" class="">
            <a
              class="flex flex-row"
              :class="{ active: route.path === '/account' }"
            >
              <UsersIcon class="w-7 h-fit hover:bg-none" />
              <a>Account</a>
            </a>
          </li>
          <li @click="selectMenu('University')" class="">
            <a
              class="flex flex-row"
              :class="{ active: route.path === '/university' }"
            >
              <BuildingLibraryIcon class="w-7 h-fit hover:bg-none" />
              <a>University</a>
            </a>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  BuildingLibraryIcon,
  PresentationChartLineIcon,
  UsersIcon,
} from "@heroicons/vue/16/solid";

export default {
  props: ["Name", "Animation"],
  components: {
    PresentationChartLineIcon,
    BuildingLibraryIcon,
    UsersIcon,
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const isActive = (href) => {
      return computed(() => route.path === href);
    };
    return { router, isActive, route };
  },
  methods: {
    selectMenu(menu) {
      this.router.push({ name: menu });
    },
  },
};
</script>

<style scoped></style>
