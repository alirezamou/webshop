import { createRouter, createWebHistory } from "vue-router";
import "firebase/auth";
import { getAuth } from "firebase/auth";
import { FirebaseApp } from "@/library/Database";

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
          component: () => import("@/components/admin/Product.vue"),
        },
      ],
    },
    {
      name: "products",
      path: "/",
      component: () => import("@/components/Products.vue"),
    },
  ],
});

export default router;
