import colors from "vuetify/es5/util/colors";

export default {
   // Global page headers: https://go.nuxtjs.dev/config-head
   head: {
      title: "Building.uz",
      htmlAttrs: {
         lang: "en",
      },
      meta: [
         { charset: "utf-8" },
         { name: "viewport", content: "width=device-width, initial-scale=1" },
         { hid: "description", name: "description", content: "" },
         { name: "format-detection", content: "telephone=no" },
      ],
      link: [
         { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
         {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;900&display=swap",
         },
      ],
   },

   // Global CSS: https://go.nuxtjs.dev/config-css
   css: [],

   // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
   plugins: [
      "~/plugins/swiper.client.js",
      "~/plugins/v-mask.js",
      "~/plugins/aos.client.js",
   ],

   // Auto import components: https://go.nuxtjs.dev/config-components
   components: true,

   // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
   buildModules: [
      "@nuxtjs/style-resources",
      // https://go.nuxtjs.dev/vuetify
      "@nuxtjs/vuetify",
   ],

   styleResources: {
      scss: ["./assets/vars/*.scss", "./assets/abstracts/_mixin.scss"],
   },

   // Modules: https://go.nuxtjs.dev/config-modules
   modules: [
      // https://go.nuxtjs.dev/axios
      "@nuxtjs/axios",
      "@nuxtjs/toast",
      "@nuxtjs/auth",
   ],
   toast: {
      position: "top-center",
      duration: 5000,
   },
   // Axios module configuration: https://go.nuxtjs.dev/config-axios
   axios: {
      baseURL: "http://127.0.0.1:8080",
   },

   router: {
      middleware: ["auth"],
   },

   auth: {
      strategies: {
         local: {
            endpoints: {
               login: {
                  url: "/api/auth",
                  method: "post",
                  propertyName: "token",
               },
               logout: false,
               user: false,
            },
         },
      },
      redirect: {
         login: "/auth",
         logout: "/",
         callback: "/",
         home: "/",
      },
   },

   // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
   vuetify: {
      customVariables: ["~/assets/variables.scss"],
      theme: {
         dark: false,
         themes: {
            dark: {
               primary: colors.blue.darken2,
               accent: colors.grey.darken3,
               secondary: colors.amber.darken3,
               info: colors.teal.lighten1,
               warning: colors.amber.base,
               error: colors.deepOrange.accent4,
               success: colors.green.accent3,
            },
         },
      },
   },

   // Build Configuration: https://go.nuxtjs.dev/config-build
   build: {},
   server: {
      host: "0",
      port: 8000,
   },
};
