<template>
   <section class="container">
      <Carousel />
      <v-row class="mt-5">
         <v-col cols="12" lg="4" xs="12">
            <img src="~/assets/img/about.jpg" alt="logo" class="about__image" />
         </v-col>
         <v-col cols="12" lg="8" xs="12">
            <h2 class="mb-4">О компании</h2>

            Наша платформа building.uz предназначена для продажи строительных
            материалов, где вы можете продавать и покупать строительные
            материалы. Так что, если у вас есть магазин бытовой техники, но нет
            платформы для онлайн-продаж, эта платформа для вас.
            <ol class="mt-4">
               <li>Загрузите свои товары на платформу building.uz.</li>
               <li>Загрузите свои объявления на платформу.</li>
               <li>Безопасно и легко покупать и продавать.</li>
            </ol>
         </v-col>
      </v-row>
   </section>
</template>

<script>
export default {
   auth: false,
};
</script>

<style lang="scss">
img.about__image {
   width: 100%;
}
</style>
