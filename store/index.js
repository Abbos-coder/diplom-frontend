export const state = () => ({
  logged_in: false,
  username: "user 1",
  sidebar: false,
  basket: [],
});

export const mutations = {
  deleteProduct(state, product_id) {
    state.basket.splice(product_id, 1);
  },
};

export const strict = false;
