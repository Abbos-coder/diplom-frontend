<template>
   <div class="container">
      <v-carousel cycle height="420" show-arrows-on-hover>
         <v-carousel-item v-for="(slide, i) in slides" :key="i">
            <v-sheet :color="colors[i]" height="100%">
               <v-row class="fill-height" align="center" justify="center">
                  <div class="text-h2 slide-img">
                     <img :src="slide" alt="slides" />
                  </div>
               </v-row>
            </v-sheet>
         </v-carousel-item>
      </v-carousel>
   </div>
</template>

<script>
export default {
   data: () => ({
      colors: ["indigo", "grey darken-3", "yellow darken-2"],
      slides: ["/anons.png", "/anons2.png", "/anons3.png"],
   }),
};
</script>

<style lang="scss">
.slide-img {
   img {
      width: 100%;
      height: 100%;
   }
}
</style>
