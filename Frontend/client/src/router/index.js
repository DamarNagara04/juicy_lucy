import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../views/HomePage.vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import OrderPage from "../views/OrderPage.vue";
import CheckOutPage from "../views/CheckOutPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterPage,
    },
    {
      path: "/order",
      name: "order",
      component: OrderPage,
    },
    {
      path: "/checkout",
      name: "checkout",
      component: CheckOutPage,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (
    (to.name === "order" && !localStorage.getItem("access_token")) ||
    (to.name === "checkout" && !localStorage.getItem("access_token"))
  ) {
    next("/login");
  } else if (
    (to.name === "login" && localStorage.getItem("access_token")) ||
    (to.name === "register" && localStorage.getItem("access_token"))
  ) {
    next("/");
  } else {
    next();
  }
});

export default router;
