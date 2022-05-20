<template>
   <v-app dark>
      <v-main>
         <Nuxt />
      </v-main>
   </v-app>
</template>

<script>
export default {
   name: "DefaultLayout",
   data() {
      return {};
   },
   mounted() {
      const get_data = localStorage.getItem("user");
      const user = JSON.parse(get_data);
      this.$store.state.user_data = user;
   },
};
</script>

<style lang="scss">
::-webkit-scrollbar {
   width: 10px;
}
::-webkit-scrollbar-thumb {
   background: grey;
   border-radius: 20px;
}
.navbar {
   position: -webkit-sticky;
   position: sticky;
   z-index: 10;
}
html {
   font-family: "Poppins", sans-serif;
}

// .layout-enter-active,
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
