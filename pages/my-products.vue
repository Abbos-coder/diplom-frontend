<template>
   <div class="container">
      <h2 class="text-center mb-10">Мой продукты</h2>
      <v-row>
         <v-col
            cols="12"
            lg="3"
            md="4"
            sm="6"
            v-for="(product, idx) in products"
            :key="idx"
            data-aos="fade-up"
            :data-aos-duration="`${idx + 1}50`"
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
                     @click.prevent="
                        $router.push(`/product-info/${product._id}`)
                     "
                  >
                     подробно
                  </v-btn>
                  <v-btn
                     color="error"
                     class="ml-3"
                     small
                     @click="removeProduct(product._id)"
                  >
                     удалить
                     <v-icon size="16">mdi-delete-empty</v-icon>
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
   async asyncData({ $axios, store }) {
      const user_id = store.state.user_data.user._id;
      const products = await $axios.$get(
         `http://127.0.0.1:8080/api/product/user-product/${user_id}`
      );
      return { products };
   },
   auth: true,
   data: () => ({
      products: [],
   }),
   methods: {
      async removeProduct(id) {
         await this.$axios.delete(`/api/product/${id}`);

         const user_id = this.$store.state.user_data.user._id;
         await this.$axios
            .$get(`http://127.0.0.1:8080/api/product/user-product/${user_id}`)
            .then((res) => {
               this.products = res;
            });
      },
   },
};
</script>

<style lang="scss">
@import "assets/scss/product";
</style>
