<template>
   <v-app dark>
      <v-main>
         <Navbar />
         <Nuxt />
         <Sidebar />
      </v-main>
   </v-app>
</template>

<script>
export default {
   name: "noFooter",
   data() {
      return {};
   },
};
</script>

<style lang="scss" scoped>
.navbar {
   position: -webkit-sticky;
   position: sticky;
   z-index: 10;
}
html {
   font-family: "Poppins", sans-serif;
}

.layout-enter-active,
.page-enter-active {
   animation: acrossIn 0.4s ease-out both;
}
.layout-leave-active,
.page-leave-active {
   animation: acrossOut 0.6s ease-in both;
}
@keyframes acrossIn {
   0% {
      transform: translate3d(100%, 0, 0);
   }
   100% {
      transform: translate3d(0, 0, 0);
   }
}
@keyframes acrossOut {
   0% {
      transform: translate3d(0, 0, 0);
   }
   100% {
      transform: translate3d(-100%, 0, 0);
   }
}
</style>
