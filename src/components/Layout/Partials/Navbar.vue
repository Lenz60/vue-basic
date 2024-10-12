<template>
  <div>
    <div class="navbar bg-primary-content rounded-sm">
      <div class="flex-none">
        <button
          @click="ToggleSidebar"
          class="btn btn-square btn-ghost drawer-button"
        >
          <Bars3BottomLeftIcon
            class="text-neutral-content h-6 w-6"
          ></Bars3BottomLeftIcon>
        </button>
      </div>
      <div class="flex-1 text-neutral-content"></div>
      <div class="flex-none">
        <button class="btn btn-square btn-ghost" @click="Logout">
          <ArrowRightStartOnRectangleIcon
            class="text-neutral-content h-6 w-6"
          ></ArrowRightStartOnRectangleIcon>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ArrowRightStartOnRectangleIcon,
  Bars3BottomLeftIcon,
} from "@heroicons/vue/16/solid";
import Swal from "sweetalert2";
import "animate.css";

export default {
  components: {
    ArrowRightStartOnRectangleIcon,
    Bars3BottomLeftIcon,
  },
  methods: {
    ToggleSidebar() {
      this.$emit("openSidebar");
    },
    Logout() {
      Swal.fire({
        title: "Are you sure?",
        text: "This will log you out of the system",
        icon: "warning",
        reverseButtons: true,
        showCancelButton: true,
        confirmButtonColor: "#1C4E80",
        cancelButtonColor: "#FF5724",
        confirmButtonText: "Yes",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("token");
          this.$router.push("/login");
        }
      });
    },
  },
};
</script>

<style scoped></style>
