<template>
   <div class="container search">
      <div class="text-center text-h4">Результаты поиска</div>
      <v-row>
         <v-col
            cols="12"
            lg="3"
            md="4"
            sm="6"
            v-for="(product, idx) in products"
            :key="idx"
         >
            <div
               class="product__card"
               data-aos="fade-up"
               :data-aos-duration="`${idx + 1}50`"
            >
               <div class="product__card--image">
                  <img :src="product.image" :alt="product.title" />
               </div>
               <div class="product__name">{{ product.title }}</div>
               <div class="product__price">
                  {{ product.price.toLocaleString("en-US") }}
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
   data: () => ({
      products: [],
   }),
   methods: {},
};
</script>

<style lang="scss" scoped></style>
