import { createRouter, createWebHistory } from "vue-router";
import "firebase/auth";
import { getAuth } from "firebase/auth";
import { FirebaseApp } from "@/library/Database";

import AdminLogin from "@/components/admin/Login.vue";
import AdminProduct from "@/components/admin/Product.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/admin",
      component: {
        render(c) {
          return c("router-view");
        },
      },
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
        { path: "login", component: AdminLogin },
        { path: "products", component: AdminProduct },
      ],
    },
  ],
});

export default router;
