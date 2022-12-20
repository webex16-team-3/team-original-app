import { createRouter, createWebHistory } from "vue-router"
import Home2 from "../views/Home2.vue"
import Result from "../views/Result.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home2,
  },
  {
    path: "/result",
    name: "Result",
    component: Result,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
