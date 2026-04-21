import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ProductDetailView from "@/views/ProductDetailView.vue";
import CartView from "@/views/CartView.vue";
import LoginView from "@/views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/product/:id",
      name: "product",
      component: ProductDetailView,
      props: (route) => ({ id: Number(route.params.id) }),
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, top: 96, behavior: "smooth" };
    }
    return { top: 0, behavior: "smooth" };
  },
});

export default router;
