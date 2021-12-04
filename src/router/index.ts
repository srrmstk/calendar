import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import EventConstructor from "@/views/EventConstructor.vue";
import EventEditor from "@/views/EventEditor.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/constructor",
    name: "EventConstructor",
    component: EventConstructor,
  },
  {
    path: "/edit/:id",
    name: "EventEditor",
    component: EventEditor,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
