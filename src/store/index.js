import { createStore } from "vuex";
import db from "@/library/Database";

const store = createStore({
  state: {
    products: {},
    items: [],
    customer: {},
    shipping: {},
    payment: {},
  },

  getters: {
    total: (state, getters) => {
      return getters.totalItems + getters.shippingPrice + getters.paymentPrice;
    },
    getProduct: (state) => (id) => {
      return state.products[id];
    },
    totalItems: (state) => {
      return state.items.reduce(
        (acc, curVal) => acc + curVal.quantity * curVal.price,
        0
      );
    },
    shippingPrice: (state) => {
      if (state.shipping.price !== undefined) {
        return state.shipping.price;
      }

      return 0;
    },
    paymentPrice: (state) => {
      if (state.payment.price !== undefined) {
        return state.payment.price;
      }

      return 0;
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
        state.items[itemIndex].quantity = quantity;
      }
    },
    REMOVE_ITEM: (state, { id, size }) => {
      let itemIndex = state.items.findIndex(
        (item) => item.id === id && item.size === size
      );

      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1);
      }
    },
    SET_CUSTOMER: (state, customer) => {
      state.customer = customer;
    },
    SET_SHIPPING: (state, shipping) => {
      state.shipping = shipping;
    },
    SET_PAYMENT: (state, payment) => {
      state.payment = payment;
    },
    CLEAR_CART: (state) => {
      state.items = [];
      state.shipping = [];
      state.payment = [];
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
    addOrder({ commit, state }) {
      db.add_order({
        cart: state.items,
        customer: state.customer,
        shipping: state.shipping,
        payment: state.payment,
      }).then(() => commit("CLEAR_CART"));
    },
  },

  plugins: [
    (store) => {
      store.dispatch("getProducts");
    },
  ],
});

export default store;
