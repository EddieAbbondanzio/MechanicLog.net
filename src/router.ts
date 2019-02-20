import Vue from "vue";
import Router from "vue-router";
import store from "./core/store/store";
import Goodbye from "@/views/public/goodbye.vue";
import PrivateMasterPage from "@/core/components/private/private-master-page.vue";

Vue.use(Router);

const router: Router = new Router({
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("./views/public/home.vue")
        },
        {
          path: "/",
          component: PrivateMasterPage,
          children: [
              {
                  path: "garage",
                  name: "garage",
                  component: () => import("./views/private/garage.vue"),
                  meta: {
                      authRequired: true
                  }
              },
              {
                path: "/dashboard",
                name: "dashboard",
                component: () => import("./views/private/dashboard.vue"),
                meta: {
                    authRequired: true
                }
            },
          ]
      },
        {
            path: "/maintenance/:vehicleId",
            name: "maintenance",
            component: () => import("./views/private/maintenance.vue"),
            meta: {
                authRequired: true
            }
        },
        {
            path: "/login",
            name: "login",
            component: () => import("./views/public/login.vue")
        },
        {
            path: "/register",
            name: "register",
            component: () => import("./views/public/sign-up.vue")
        },
        {
            path: "/forgot",
            name: "forgot",
            component: () => import("./views/public/forgot.vue")
        },
        {
            path: "/reset",
            name: "reset",
            component: () => import("./views/public/reset.vue")
        },
        {
            path: "/goodbye",
            name: "goodbye",
            component: Goodbye
        }
    ]
});

// Route guard for logged in users.
router.beforeEach((to, from, next) => {
    // Skip over routes that don't require auth.
    if (!to.meta.authRequired) {
        next();
        return;
    }

    if ((store.state as any).user.currentUser != null) {
        next();
    } else {
        next({
            path: "/login"
        });
    }
});

export default router;
