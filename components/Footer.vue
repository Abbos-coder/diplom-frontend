<template>
   <v-footer dark padless class="mt-16">
      <v-card flat tile class="text-center pt-16" min-width="100%">
         <v-card-text class="white--text pt-0">
            <v-row>
               <v-col>
                  <div class="footer__logo">
                     <img src="~/assets/img/logo3.svg" alt="logo" />
                  </div>
               </v-col>
               <v-col>
                  <p class="text-left footer--title">Меню</p>
                  <ul class="footer__list text-left">
                     <li>
                        <nuxt-link to="/" class="footer__link"
                           >Все продукты</nuxt-link
                        >
                     </li>
                     <li>
                        <nuxt-link to="/about" class="footer__link"
                           >О нас</nuxt-link
                        >
                     </li>
                     <li>
                        <nuxt-link to="/contact" class="footer__link"
                           >Контакт</nuxt-link
                        >
                     </li>
                  </ul>
               </v-col>
               <v-col>
                  <p class="text-left footer--title">Продавцам</p>
                  <ul class="footer__list text-left">
                     <li>
                        <nuxt-link to="/" class="footer__link">
                           Тарифные планы
                        </nuxt-link>
                     </li>
                     <li>
                        <nuxt-link to="/" class="footer__link">
                           Баннерная реклама
                        </nuxt-link>
                     </li>
                     <li>
                        <nuxt-link to="/" class="footer__link">
                           Как продавать на Building.uz
                        </nuxt-link>
                     </li>
                  </ul>
               </v-col>
               <v-col>
                  <div class="text-left">
                     <v-btn
                        v-for="icon in icons"
                        :key="icon"
                        class="mx-4 white--text"
                        icon
                     >
                        <v-icon size="28px">
                           {{ icon }}
                        </v-icon>
                     </v-btn>
                  </div>
                  <p class="text-left mt-8 ml-4">
                     <v-icon size="24" color="blue">mdi-email</v-icon>
                     <span class="text-body-1 ml-2">
                        khamidullaev24@gmail.com
                     </span>
                  </p>
                  <p class="text-left mt-3 ml-4">
                     <v-icon size="22" color="green">mdi-phone</v-icon>
                     <span class="text-body-1 ml-2">+998 (99) 403-68-28</span>
                  </p>
               </v-col>
            </v-row>
         </v-card-text>

         <v-divider class="mt-7" />

         <v-card-text class="white--text">
            {{ new Date().getFullYear() }} —
            <strong>&copy; All rights reserved</strong>
         </v-card-text>
      </v-card>
   </v-footer>
</template>

<script>
export default {
   data: () => ({
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
   }),
};
</script>

<style lang="scss">
.footer--title {
   font-size: 22px;
   font-weight: 500;
}
.footer {
   &__logo {
      width: 220px;
      img {
         width: 200px;
      }
   }
   &__list {
      list-style: none;
      padding-left: 0 !important;
   }
   &__link {
      text-decoration: none;
      color: #fff;
      line-height: 2;
      font-weight: 400;
      font-size: 18px;
   }
}
</style>
