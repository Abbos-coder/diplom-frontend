<template>
   <div>
      <v-navigation-drawer v-model="$store.state.sidebar" fixed clipped app>
         <v-list-item>
            <!-- <v-list-item-title> Category </v-list-item-title> -->
            <h1 class="ml-8">
               <v-icon color="primary">mdi-shape</v-icon> Category
            </h1>
            <v-list-item-content> </v-list-item-content>
         </v-list-item>

         <v-divider></v-divider>
         <v-expansion-panels>
            <v-expansion-panel v-for="(item, i) in categories" :key="i">
               <v-expansion-panel-header>
                  {{ item.category }}
               </v-expansion-panel-header>
               <v-expansion-panel-content>
                  <v-list dense>
                     <v-list-item
                        link
                        v-for="(ctg, idx) in item.sub_category"
                        :key="idx"
                        router
                        @click.prevent="
                           $router.push(`/product/${ctg.toLowerCase()}/`)
                        "
                     >
                        <v-list-item-content>
                           <v-list-item-title>
                              {{ ctg }}
                           </v-list-item-title>
                        </v-list-item-content>
                     </v-list-item>
                  </v-list>
               </v-expansion-panel-content>
            </v-expansion-panel>
         </v-expansion-panels>
      </v-navigation-drawer>
   </div>
</template>

<script>
export default {
   data: () => ({
      clipped: true,
      drawer: null,
      categories: [],
   }),
   async mounted() {
      await this.$axios.$get("/api/category/").then((res) => {
         this.categories = res;
      });
   },
};
</script>

<style></style>
