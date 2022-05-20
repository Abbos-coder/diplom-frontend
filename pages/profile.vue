<template>
   <div class="container">
      <h3 class="text-center text-h4 mt-4 mb-13">Мой профиль</h3>
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
                  :rules="lastnameRules"
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
                           Date.now() - new Date().getTimezoneOffset() * 60000
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
         <v-row>
            <v-btn
               color="info"
               class="text-capitalize ml-auto"
               @click="validate"
            >
               сохранить
            </v-btn>
         </v-row>
      </v-form>
   </div>
</template>

<script>
import { isThisExpression } from "@babel/types";

export default {
   auth: true,
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
         (v) => !!v || "Введите ваше имя",
         (v) =>
            (v && v.length >= 4) ||
            "Ваше имя должно быть не менее 4 букв или символов",
      ],
      lastnameRules: [
         (v) => !!v || "Введите вашу фамилию",
         (v) =>
            (v && v.length >= 4) ||
            "Ваше фамилия должно быть не менее 4 букв или символов",
      ],
      passRules: [
         (v) => !!v || "Введите ваш пароль",
         (v) =>
            (v && v.length >= 6) ||
            "Ваш пароль должен быть не менее 6 символов",
      ],
      email: "",
      emailRules: [
         (v) => !!v || "Введите ваш e-mail",
         (v) => /.+@.+\..+/.test(v) || "Введите правильный e-mail",
      ],
      phoneRules: [
         (v) => !!v || "Введите свой номер телефона",
         (v) => (v && v.length >= 7) || "Ваше число не должно быть меньше 7",
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
         const user_id = this.$store.state.user_data.user._id;
         if (validate) {
            await this.$axios
               .$put(`/api/users/${user_id}`, this.user)
               .then((res) => {
                  this.$toast.success("Изменения сохранены !");
               })
               .catch((error) => {
                  console.error(error);
               });

            const config = {
               headers: {
                  "Content-Type": "application/json",
                  "x-auth-token": this.$store.state.user_data.token,
               },
            };
            const user_data = await this.$axios.$get(
               `/api/users/${user_id}`,
               config
            );
            const data = {
               token: this.$store.state.user_data.token,
               user: user_data,
            };
            localStorage.setItem("user", JSON.stringify(data));
            this.$store.state.user_data.user = user_data;
            const store = this.$store.state.user_data.user;
            if (!!store) {
               this.user.firstname = store.firstname;
               this.user.lastname = store.lastname;
               this.user.company = store.company;
               this.user.email = store.email;
               this.user.password = store.password;
               this.user.address = store.address;
               this.user.phone = store.phone;
               this.user.birthDay = store.birthDay;
            }
         }
      },
   },
   mounted() {
      const store = this.$store.state.user_data.user;
      if (!!store) {
         this.user.firstname = store.firstname;
         this.user.lastname = store.lastname;
         this.user.company = store.company;
         this.user.email = store.email;
         this.user.password = store.password;
         this.user.address = store.address;
         this.user.phone = store.phone;
         this.user.birthDay = store.birthDay;
      }
   },
};
</script>

<style lang="scss"></style>
