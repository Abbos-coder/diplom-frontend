<template>
   <v-app>
      <div class="auth container">
         <v-card width="800" class="mx-auto mt-10">
            <v-card-title>
               <h1 class="display-1">Регистрация</h1>
            </v-card-title>
            <v-card-text>
               <v-form ref="form" v-model="valid" lazy-validation>
                  <v-row>
                     <v-col cols="12" lg="6" sm="6" xs="12">
                        <v-text-field
                           label="Ваша имя"
                           v-model="user.firstname"
                           :rules="nameRules"
                           required
                           prepend-icon="mdi-account"
                        ></v-text-field>
                     </v-col>
                     <v-col cols="12" lg="6" sm="6" xs="12">
                        <v-text-field
                           label="Ваша фамилия"
                           v-model="user.lastname"
                           :rules="nameRules"
                           required
                           prepend-icon="mdi-account"
                        ></v-text-field>
                     </v-col>
                  </v-row>

                  <v-row>
                     <v-col cols="12" lg="6" sm="6" xs="12">
                        <v-text-field
                           label="Названия компание или магазина"
                           v-model="user.company"
                           :rules="nameRules"
                           required
                           prepend-icon="mdi-home"
                        ></v-text-field>
                     </v-col>
                     <v-col cols="12" lg="6" sm="6" xs="12">
                        <v-text-field
                           label="Ваш адрес"
                           placeholder="Ташкент  ул. Бобура 77"
                           v-model="user.address"
                           :rules="nameRules"
                           required
                           prepend-icon="mdi-map-marker"
                        ></v-text-field>
                     </v-col>
                  </v-row>

                  <v-row>
                     <v-col cols="12" lg="6" sm="6" xs="12">
                        <v-text-field
                           label="Пароль"
                           :type="showPass ? 'text' : 'password'"
                           @click:append="showPass = !showPass"
                           v-model="user.password"
                           :rules="passRules"
                           required
                           prepend-icon="mdi-lock"
                        ></v-text-field>
                     </v-col>
                     <v-col cols="12" lg="6" sm="6" xs="12">
                        <v-text-field
                           label="Email"
                           v-model="user.email"
                           :rules="emailRules"
                           required
                           prepend-icon="mdi-email"
                        ></v-text-field>
                     </v-col>
                  </v-row>
                  <v-row>
                     <v-col cols="12" lg="6" sm="6" xs="12">
                        <v-text-field
                           label="Телефон номер"
                           v-model="user.phone"
                           prefix="+998"
                           v-mask="'(##) ###-##-##'"
                           type="text"
                           placeholder="(99) 403-68-28"
                           :rules="phoneRules"
                           required
                           prepend-icon="mdi-phone"
                        ></v-text-field>
                     </v-col>
                     <v-col cols="12" lg="6" sm="6" xs="12">
                        <v-menu
                           ref="menu"
                           v-model="menu"
                           :close-on-content-click="false"
                           transition="scale-transition"
                           offset-y
                           min-width="auto"
                        >
                           <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                 v-model="user.birthDay"
                                 label="Дата рождения"
                                 prepend-icon="mdi-calendar"
                                 readonly
                                 v-bind="attrs"
                                 v-on="on"
                              ></v-text-field>
                           </template>
                           <v-date-picker
                              v-model="user.birthDay"
                              :active-picker.sync="activePicker"
                              :max="
                                 new Date(
                                    Date.now() -
                                       new Date().getTimezoneOffset() * 60000
                                 )
                                    .toISOString()
                                    .substr(0, 10)
                              "
                              min="1950-01-01"
                              @change="save"
                           ></v-date-picker>
                        </v-menu>
                     </v-col>
                  </v-row>
               </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
               <v-btn to="/auth" color="primary" class="text-capitalize">
                  Login
               </v-btn>
               <v-btn
                  color="warning"
                  class="text-capitalize ml-auto"
                  @click="reset"
               >
                  reset
               </v-btn>
               <v-btn color="success" class="text-capitalize" @click="validate">
                  Register
               </v-btn>
            </v-card-actions>
         </v-card>
      </div>
   </v-app>
</template>

<script>
export default {
   layout: "noNavbar",
   auth: false,
   data: () => ({
      valid: true,
      activePicker: null,
      showPass: false,
      menu: false,
      user: {
         firstname: "",
         lastname: "",
         company: "",
         address: "",
         password: "",
         email: "",
         phone: "",
         birthDay: "",
      },
      nameRules: [
         (v) => !!v || "Ismingizni kuriting",
         (v) =>
            (v && v.length >= 4) ||
            "Ismingiz 4 ta harif yoki simvoldan kam bolmasligi kerak",
      ],
      passRules: [
         (v) => !!v || "Parolingizni kuriting",
         (v) =>
            (v && v.length >= 6) ||
            "Parolingiz 6 ta simvoldan kam bolmasligi kerak",
      ],
      email: "",
      emailRules: [
         (v) => !!v || "E-mail kiriting",
         (v) => /.+@.+\..+/.test(v) || "Tog'ri E-mail kiriting",
      ],
      phoneRules: [
         (v) => !!v || "Telefon raqamingizni kuriting",
         (v) =>
            (v && v.length >= 7) || "Raqamingiz 7 tadan kam bolmasligi kerak",
      ],
   }),
   watch: {
      menu(val) {
         val && setTimeout(() => (this.activePicker = "YEAR"));
      },
   },

   methods: {
      save(date) {
         this.$refs.menu.save(date);
      },
      async validate() {
         const validate = this.$refs.form.validate();
         if (validate) {
            const user = this.user;
            await this.$axios
               .$post("/api/users", user)
               .then((res) => {
                  const user = res;
                  user.logged_in = true;
                  localStorage.setItem("user", JSON.stringify(user));
                  this.$toast
                     .success("Siz ro'yxatdan o'tdingiz !")
                     .goAway(5000);
                  this.$router.push("/auth");
               })
               .catch((error) => {
                  this.$toast.error("Mavjud bolgan e-mail").goAway(5000);
                  console.log(error);
               });
         } else {
            console.log("error");
         }
      },
      reset() {
         this.$refs.form.reset();
      },
   },
};
</script>

<style lang="scss" scoped></style>
