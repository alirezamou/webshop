import { createStore } from "vuex";
import db from "@/library/Database";

const store = createStore({
  state: {
    products: {},
  },
  getters: {
    getProduct: (state) => (id) => {
      return state.products[id];
    },
  },
  mutations: {
    SET_PRODUCTS: (state, products) => {
      state.products = products;
    },
  },
  actions: {
    getProducts({ commit }) {
      db.get_products().then((products) => {
        let tempProducts = {};

        products.forEach((product) => {
          tempProducts[product.id] = product.data();
        });

        commit("SET_PRODUCTS", tempProducts);
      });
    },
  },
  plugins: [
    (store) => {
      store.dispatch("getProducts");
    },
  ],
});

export default store;
