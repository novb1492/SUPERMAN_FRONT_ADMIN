
import { createStore } from "vuex";
import { NavStore } from "@/store/NavStore";
import { basicStore } from "@/store/basicStore";
import { kmapStore } from "@/store/kmapStore";

export const stores = createStore({
  modules: { kmapStore, basicStore, NavStore }
});