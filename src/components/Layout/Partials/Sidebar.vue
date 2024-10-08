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
        class="menu bg-base-200 text-base-content h-full w-80 pt-36 border-2 border-green-500"
      >
        <!-- Sidebar content here -->
        <li @click="selectMenu('Dashboard')"><a>Dashboard</a></li>
        <li @click="selectMenu('Account')"><a>Account</a></li>
        <li @click="selectMenu('University')"><a>University</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, onUpdated } from "vue";
import { useRouter } from "vue-router";
export default {
  props: ["Toggle"],
  setup(props) {
    const router = useRouter();
    console.log(props.Toggle);
    return { router };
  },
  methods: {
    selectMenu(menu) {
      // console.log(menu);
      this.router.push({ name: menu });
      // this.$emit("selected", menu);
    },
  },
};
</script>

<style scoped></style>
