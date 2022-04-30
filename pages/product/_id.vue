<template>
  <div class="container product">
    <h1 class="text-center mb-5">Арматури</h1>
    <v-row v-if="products.length">
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
            {{ product.price ? product.price.toLocaleString("en-US") : null }}
            <span>сум /</span>
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
          <v-btn
            color="primary"
            class="mt-1 mb-3"
            small
            @click.prevent="$router.push(`/product-info/${product._id}`)"
          >
            подробно
          </v-btn>
          <div
            class="product__status ml-3 green--text text--accent-4 text-caption align-self-start"
          >
            {{ product.status ? "в наличии" : "нет в наличии" }}
          </div>
        </div>
      </v-col>
    </v-row>
    <h6 class="text-center text-h6 mt-5 red--text" v-else>
      нет продукта на этом каталоге !
    </h6>
  </div>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      products: [],
    };
  },
  async mounted() {
    const params = this.$route.params;
    console.log(params.id);
    await this.$axios
      .$get(`/api/product/category/${params.id}`)
      .then((res) => {
        console.log(res);
        this.products = res;
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/product";
</style>
