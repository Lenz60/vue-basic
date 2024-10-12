<template>
  <div
    class="flex flex-row items-center justify-center w-screen h-screen bg-base"
  >
    <div
      class="flex flex-col items-center p-10 bg-base rounded-md shadow-xl border border-slate-700"
    >
      <h1 class="text-2xl font-bold p-2 pb-5 card text-primary-content">
        Login
      </h1>
      <div class="p-2">
        <form @submit.prevent="checkForm" id="loginForm">
          <div
            class="flex flex-col p-5 rounded-sm shadow-xl text-primary-content"
          >
            <div class="flex flex-col p-2">
              <label class="p-1" for="Email">Email</label>
              <input
                v-model="email"
                class="rounded-sm input input-bordered input-primary w-full max-w-xs input-sm"
                type="email"
              />
              <div v-if="errors.email" class="text-red-500">
                <p v-for="error in errors.email" :key="error">{{ error }}</p>
              </div>
            </div>
            <div class="flex flex-col p-2">
              <label class="p-1" for="Password">Password</label>
              <input
                v-model="password"
                class="rounded-sm input input-bordered input-primary w-full max-w-xs input-sm"
                type="password"
              />
              <div v-if="errors.password" class="text-red-500">
                <p v-for="error in errors.password" :key="error">{{ error }}</p>
              </div>
            </div>
          </div>
        </form>
        <div class="w-full text-end p-2">
          <!-- <RouterLink
            :to="{
              name: 'Dashboard',
              params: {
                email: email,
              },
            }"
          > -->
          <button
            type="submit"
            form="loginForm"
            class="bg-primary btn-md mt-5 p-2 rounded-md w-[40%] text-slate-50 font-semibold hover:bg-secondary"
          >
            <div
              v-if="stateLoading"
              class="items-center justify-center text-center flex flex-row w-full"
            >
              <span class="loading loading-spinner loading-md text-base"></span>
            </div>
            <div v-else>
              <span>Login</span>
            </div>
          </button>
          <!-- </RouterLink> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
// import router from "../../router";
export default {
  components: {
    RouterLink,
    RouterView,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const errors = ref({
      email: [],
      password: [],
    });
    let email = ref("");
    let password = ref("");
    const stateLoading = ref(false);
    const login = async () => {
      // checkForm(e);
      stateLoading.value = !stateLoading.value;
      try {
        const response = await axios
          .post("https://localhost:7117/api/Account/Login", {
            email: email.value,
            password: password.value,
          })
          .then((response) => {
            console.log(response);
            if (response.status == 200) {
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                },
              });
              Toast.fire({
                icon: "success",
                title: "Signed in successfully",
              });
              // alert("LoggedIn");
              localStorage.setItem("token", response.data.data);
              router.push({ name: "Dashboard" });
            }
          });
      } catch (error) {
        alert(error.response.data.message);
        console.error("Error adding data:", error);
      }
      stateLoading.value = !stateLoading.value;
      // axios.get("http://localhost:5173/dashboard", { email: email.value });
    };

    return { stateLoading, email, router, route, login, password, errors };
  },
  methods: {
    checkForm: function (e) {
      // e.preventDefault();
      this.errors.email = [];
      this.errors.password = [];
      if (this.email && this.password) {
        this.login();
        return true;
      }
      if (!this.email) {
        this.errors.email.push("Email required");
        return false;
      }
      if (!this.password) {
        this.errors.password.push("Password required");
        return false;
      }
      e.preventDefault();
      return false;

      // this.login();
      // console.log(e);
    },
    // login() {
    //   this.stateLoading = !this.stateLoading;
    //   // router.push({ name: "Dashboard", params: { email: this.email } });
    //   this.router.push({ name: "Dashboard", params: { email: this.email } });
    //   // router.push()
    // },
  },
};
</script>

<style lang="scss" scoped></style>
