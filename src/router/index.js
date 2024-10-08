import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";
// import App from "../App.vue";
import Dashboard from "../components/Dashboard.vue";
import HelloWorld from "../components/HelloWorld.vue";
import Login from "../components/Auth/Login.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Login,
    props: true,
    // props: (route) => ({ email: route.params.email }), // Enable props
  },
  {
    path: "/hello",
    name: "hello",
    component: HelloWorld,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Dashboard,
    // props: true, // Enable props
    props: (route) => ({ email: route.query.email }),
    // props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
