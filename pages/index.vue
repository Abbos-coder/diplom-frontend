<template>
  <div class="container product">
    <h1 class="text-center mb-5 text-h4 text-capitalize">стройматериали</h1>
    <v-row>
      <v-col
        cols="12"
        lg="3"
        md="4"
        sm="6"
        v-for="product in products"
        :key="product.id"
      >
        <div class="product__card">
          <div class="product__card--image">
            <img :src="product.image" :alt="product.name" />
          </div>
          <div class="product__name">{{ product.name }}</div>
          <div class="product__price">
            {{ product.price.toLocaleString("en-US") }} <span>сум /</span>
            <span> тонна</span>
          </div>
          <v-rating
            v-model="product.rating"
            color="yellow darken-3"
            background-color="grey darken-1"
            empty-icon="$ratingFull"
            half-increments
            size="20"
            hover
          ></v-rating>
          <v-row class="my-4">
            <v-btn
              color="success"
              small
              @click.prevent="$router.push(`/product-info/${product._id}`)"
            >
              подробно
            </v-btn>
            <v-btn
              color="primary"
              class="ml-3"
              small
              @click="addToBasket(product)"
            >
              добавить
              <v-icon size="16">mdi-cart</v-icon>
            </v-btn>
          </v-row>

          <div
            class="product__status ml-3 green--text text--accent-4 text-caption align-self-start font-weight-medium"
            v-if="product.status"
          >
            в наличии
          </div>
          <div
            class="product__status ml-3 red--text text--accent-4 text-caption align-self-start font-weight-medium"
            v-else
          >
            нет в наличии
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const products = await $axios.$get(`http://127.0.0.1:8080/api/product`);
    return { products };
  },
  auth: false,

  data() {
    return {};
  },
  methods: {
    addToBasket(e) {
      this.$store.state.basket.push(e);
      this.$toasted.success("Product added !", {
        theme: "bubble",
        position: "top-left",
        duration: 5000,
        icon: "done",
        action: {
          onClick: (e, toastObject) => {
            toastObject.goAway(0);
          },
        },
      });
    },
  },
  async mounted() {
    const products = await this.$axios.$get(
      `http://127.0.0.1:8080/api/product`
    );
    this.products = products.reverse();
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/product";
.v-rating {
  position: relative;
  z-index: 0 !important;
}
</style>
