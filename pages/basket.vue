<template>
   <div class="container">
      <h1 class="text-center text-h4 mt-3 text-capitalize">корзина</h1>
      <div v-if="!products.length">
         <h3 class="text-center text-h6 text-body-1 warning--text mt-6">
            Продукт ешо не выбран!
         </h3>
         <v-row class="mt-5">
            <v-btn
               class="text-center ml-auto mr-auto text-capitalize"
               color="info"
               to="/"
            >
               home
            </v-btn>
         </v-row>
      </div>

      <v-card
         elevation="2"
         class="basket"
         v-for="(item, idx) in products"
         :key="idx"
         v-else
         data-aos="fade-up"
         :data-aos-duration="`1000`"
      >
         <v-row class="mt-4">
            <v-col cols="12" lg="3" xs="12" class="d-flex justify-center">
               <img :src="item.image" :alt="item.title" class="basket__image" />
            </v-col>
            <v-col>
               <v-card-title>{{ item.title }}</v-card-title>
               <v-card-subtitle>
                  {{ item.price.toLocaleString("en-US") }}
                  <span>sum</span>
               </v-card-subtitle>
               <v-card-text>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Impedit molestias, numquam modi quidem autem quis? Fuga, nemo!
                  Magni quo ipsum architecto ipsam vel provident, eaque illum
                  similique aliquid deserunt id!
               </v-card-text>
               <v-card-actions class="ml-2">
                  <v-btn color="error" small @click="removeProduct(idx)">
                     удалить
                     <v-icon size="18">mdi-delete-empty</v-icon>
                  </v-btn>
                  <v-btn color="success" small>
                     купить
                     <v-icon size="18">mdi-currency-usd</v-icon>
                  </v-btn>
               </v-card-actions>
            </v-col>
         </v-row>
      </v-card>
      <v-divider class="mt-16"></v-divider>
      <div class="font-weight-medium text-right text-h5 mt-4 mb-10">
         Total:
         <span class="blue--text text--darken-3">
            {{ calcProducts ? calcProducts.toLocaleString("en-US") : 0 }}
         </span>
         сум
      </div>
   </div>
</template>

<script>
export default {
   layout: "noFooter",
   data: () => ({
      products: [],
   }),
   computed: {
      basket() {
         return this.$store.state.basket;
      },
   },
   methods: {
      removeProduct(selected) {
         this.$store.commit("deleteProduct", selected);
         this.$toast.error("Продукт удален !", {
            theme: "bubble",
         });
      },
   },
   computed: {
      calcProducts() {
         const total_sum = this.$store.state.basket.map((elem) => elem.price);
         if (total_sum.length) {
            const total = total_sum.reduce((a, b) => a + b);
            return total;
         }
      },
   },
   mounted() {
      this.products = this.$store.state.basket;
   },
};
</script>

<style lang="scss" scoped>
.basket {
   &__image {
      width: 100%;
      height: 250px;
      object-fit: cover;
      object-position: center;
   }
}
</style>
