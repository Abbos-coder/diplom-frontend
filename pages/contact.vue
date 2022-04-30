<template>
  <div class="container">
    <h2 class="text-center text-h4">Contact</h2>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col>
          <v-text-field
            label="Ваша имя"
            :rules="[(v) => !!v || 'Это обязательный']"
            v-model="user_msg.name"
          ></v-text-field>
          <v-text-field
            label="Ваш номер"
            type="text"
            :rules="[(v) => !!v || 'Это обязательный']"
            placeholder="(99) 403-68-28"
            v-model="user_msg.tel"
            return-masked-value
            :value="user_msg.tel"
            v-mask="'(##) ###-##-##'"
            prefix="+998"
          ></v-text-field>
          <v-text-field
            label="Ваш e-mail"
            placeholder="example@gmail.com"
            :rules="emailRules"
            v-model="user_msg.email"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-textarea
            clearable
            clear-icon="mdi-close-circle"
            label="Ваша сообщения"
            no-resize
            height="170"
            :rules="[(v) => !!v || 'Это обязательный']"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-form>
    <v-row>
      <v-btn
        :disabled="!valid"
        color="primary"
        class="ml-auto"
        @click="resetForm"
      >
        Отправить
      </v-btn>
    </v-row>
  </div>
</template>

<script>
export default {
  auth: false,
  data: () => ({
    valid: true,
    user_msg: {
      name: "",
      email: "",
      tel: "",
      message: "",
    },
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),
  methods: {
    resetForm() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style></style>
