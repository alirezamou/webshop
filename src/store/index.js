import { createStore } from "vuex";
import db from "@/library/Database";

const store = createStore({
  state: {
    products: {},
    items: [],
  },

  getters: {
    getProduct: (state) => (id) => {
      return state.products[id];
    },
    totalItems: (state) => {
      state.items.reduce(
        (acc, curVal) => acc + curVal.quantity * curVal.price,
        0
      );
    },
  },

  mutations: {
    SET_PRODUCTS: (state, products) => {
      state.products = products;
    },
    ADD_ITEM: (state, { id, size, price, quantity }) => {
      let itemIndex = state.items.findIndex(
        (item) => item.id === id && item.size === size
      );

      if (itemIndex !== -1) {
        state.items[itemIndex].quantity += quantity;
      } else {
        state.items.push({ id, size, price, quantity });
      }
    },
    SET_ITEM_QUANTITY: (state, { id, size, quantity }) => {
      let itemIndex = state.items.findIndex(
        (item) => item.id === id && item.size === size
      );

      if (itemIndex !== -1) {
        state.items[itemIndex] = quantity;
      }
    },
    REMOVE_ITEM: (state, { id }) => {
      let itemIndex = state.items.findIndex(
        (item) => item.id === id && item.size === size
      );

      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1);
      }
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
