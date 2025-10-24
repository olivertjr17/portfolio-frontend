import { createWebHistory, createRouter } from "vue-router"
import useUserStore from "./store/user"

const routes = [
  {
    path: "/",
    component: () => import("./layouts/GuestLayout.vue"),
    children: [
      {
        path: "",
        name: "GuestHome",
        component: () => import("./pages/guest/Home.vue"),
      },
      {
        path: "about-me",
        name: "GuestAboutMe",
        component: () => import("./pages/guest/AboutMe.vue"),
      },
      {
        path: "professional",
        name: "GuestProfessional",
        component: () => import("./pages/guest/Professional.vue"),
      },
      {
        path: "projects",
        name: "GuestProjects",
        component: () => import("./pages/guest/Projects.vue"),
      },
      {
        path: "contact",
        name: "GuestContact",
        component: () => import("./pages/guest/Contact.vue"),
      },
      {
        path: "login",
        name: "GuestLogin",
        component: () => import("./pages/guest/Login.vue"),
      },
    ],
  },
  {
    path: "/admin",
    component: () => import("./layouts/AdminLayout.vue"),
    beforeEnter: async (to, from, next) => {
      try {
        const userStore = useUserStore()
        await userStore.fetchUser()
        next()
      } catch (error) {
        next(false)
      }
    },
    children: [
      { path: "", redirect: { name: "AdminDashboard" } },
      {
        path: "dashboard",
        name: "AdminDashboard",
        component: () => import("./pages/admin/Dashboard.vue"),
      },
      {
        path: "projects",
        name: "AdminProjects",
        component: () => import("./pages/admin/Projects.vue"),
      },
      // {
      //   path: "experience",
      //   name: "AdminExperience",
      //   component: () => import("./pages/admin/Experience.vue"),
      // },
      {
        path: "settings",
        name: "AdminSettings",
        component: () => import("./pages/admin/Settings.vue"),
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
