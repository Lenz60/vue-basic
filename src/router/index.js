import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";
// import App from "../App.vue";
import Dashboard from "../components/Pages/Dashboard.vue";
import University from "../components/Pages/University.vue";
import Account from "../components/Pages/Account.vue";
import HelloWorld from "../components/HelloWorld.vue";
import Login from "../components/Auth/Login.vue";
import MainLayout from "../components/Layout/MainLayout.vue";
import LifeCycleHook from "../components/Tutorial/LifeCycleHook.vue";

const routes = [
  // {
  //   path: "/",
  //   name: "home",
  //   component: Login,
  //   props: true,
  //   // props: (route) => ({ email: route.params.email }), // Enable props
  // },
  {
    path: "/",
    name: "Index",
    component: MainLayout,
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "/university",
        name: "University",
        component: University,
      },
      {
        path: "/account",
        name: "Account",
        component: Account,
      },
    ],
  },
  {
    path: "/hello",
    name: "hello",
    component: HelloWorld,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/lifecycle",
    name: "lifecycle",
    component: LifeCycleHook,
  },
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   // route level code-splitting
  //   // this generates a separate chunk (About.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: Dashboard,
  //   // props: true, // Enable props
  //   props: (route) => ({ email: route.query.emailPayload }),
  //   // props: true,
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
