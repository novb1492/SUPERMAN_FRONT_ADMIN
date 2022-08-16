
import { createStore } from "vuex";
import { NavStore } from "@/store/NavStore";
import { basicStore } from "@/store/basicStore";
import { kmapStore } from "@/store/kmapStore";
import {MarketStore  } from "@/store/MarketStore";
import { ProductStore } from "@/store/ProductStore";
export const stores = createStore({
  modules: { kmapStore, basicStore, NavStore,MarketStore,ProductStore }
});