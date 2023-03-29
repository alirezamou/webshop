import { createRouter, createWebHistory } from "vue-router";
import "firebase/auth";
import { getAuth } from "firebase/auth";
import { FirebaseApp } from "@/library/Database";
import AdminProduct from "@/components/admin/Product.vue";
import Product from "@/components/Product.vue";
import Cart from "@/components/Cart.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/admin",
      beforeEnter(to, _from, next) {
        let auth = getAuth(FirebaseApp);

        if (auth.currentUser === null && to.path !== "/admin/login") {
          next({
            path: "/admin/login",
          });
        } else if (auth.currentUser !== null && to.path === "/admin/products") {
          next({
            path: "/admin/products",
          });
        } else {
          next();
        }
      },
      children: [
        {
          path: "login",
          component: () => import("@/components/admin/Login.vue"),
        },
        {
          path: "products",
          component: AdminProduct,
        },
      ],
    },
    {
      name: "products",
      path: "/",
      component: () => import("@/components/Products.vue"),
    },
    {
      name: "product",
      path: "/product/:id",
      component: Product,
    },
    {
      name: "cart",
      path: "/cart",
      component: Cart,
    },
  ],
});

export default router;
