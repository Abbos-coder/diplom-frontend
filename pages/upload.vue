<template>
   <div class="container">
      <h1 class="text-center text-h4 mb-4">Добавить продукт</h1>
      <v-row>
         <v-col cols="12" lg="8">
            <v-form ref="form" v-model="valid" lazy-validation>
               <v-file-input
                  accept="image/png, image/jpeg, image/*"
                  prepend-icon="mdi-camera"
                  label="Фото продукта"
                  v-model="image"
                  @change="productImage()"
                  :rules="[(v) => !!v || 'This is required']"
               ></v-file-input>
               <v-combobox
                  v-model="category_val"
                  :items="category"
                  label="Category"
                  :rules="[(v) => !!v || 'This is required']"
                  @click="resetCategory"
               ></v-combobox>
               <v-combobox
                  v-model="sub_category_val"
                  :items="sub_category"
                  label="Sub category"
                  :rules="[(v) => !!v || 'This is required']"
               ></v-combobox>
               <v-text-field
                  v-model="product.name"
                  label="Названия продукта"
                  :rules="[(v) => !!v || 'This is required']"
               ></v-text-field>
               <v-text-field
                  v-model="product.price"
                  type="number"
                  label="Цена продукта"
                  hide-spin-buttons
                  :rules="[(v) => !!v || 'This is required']"
               ></v-text-field>
               <v-textarea
                  clearable
                  clear-icon="mdi-close-circle"
                  v-model="product.description"
                  label="Подробное описания продукта"
                  no-resize
                  height="170"
                  :rules="[(v) => !!v || 'Это обязательный']"
               ></v-textarea>
               <v-switch
                  v-model="product.status"
                  :label="`Складъ: ${
                     product.status ? 'в наличии' : 'нет в наличии'
                  }`"
               ></v-switch>
            </v-form>
            <v-row>
               <v-btn
                  color="primary"
                  class="mt-4 ml-auto"
                  @click="validateUpload"
               >
                  Добавить
               </v-btn>
            </v-row>
         </v-col>
         <v-col cols="12" lg="3" v-if="!!product.image">
            <div class="product">
               <div class="product__card">
                  <div class="product__card--image">
                     <img :src="product.image" :alt="product.name" />
                  </div>
                  <div class="product__name">{{ product.name }}</div>
                  <div class="product__price">
                     {{
                        product.price
                           ? product.price.toLocaleString("en-US")
                           : product.price
                     }}
                     <span>сум /</span>
                     <span>тонна</span>
                  </div>
                  <v-rating
                     v-model="product.rating"
                     color="yellow darken-3"
                     background-color="grey darken-1"
                     empty-icon="$ratingFull"
                     half-increments
                     size="20"
                     hover
                  ></v-rating>
                  <v-row class="my-4">
                     <v-btn
                        color="success"
                        small
                        @click.prevent="$router.push(`/product-info/1`)"
                     >
                        подробно
                     </v-btn>
                     <v-btn color="primary" class="ml-3" small>
                        добавить
                        <v-icon size="16">mdi-cart</v-icon>
                     </v-btn>
                  </v-row>

                  <div
                     class="product__status ml-3 green--text text--accent-4 text-caption align-self-start font-weight-medium"
                     v-if="product.status"
                  >
                     в наличии
                  </div>
                  <div
                     class="product__status ml-3 red--text text--accent-4 text-caption align-self-start font-weight-medium"
                     v-else
                  >
                     нет в наличии
                  </div>
               </div>
            </div>
         </v-col>
      </v-row>
   </div>
</template>

<script>
export default {
   data: () => ({
      valid: true,
      image: null,
      product: {
         user_id: "",
         image: "",
         category: "",
         name: "",
         price: null,
         description: "",
         rating: 0,
         status: true,
      },
      categories: [
         {
            category: "Металлопрокат",
            sub_category: [
               "Арматура",
               "Стальные балки",
               "Проволоки",
               "Рулонные стали",
            ],
         },
         {
            category: "Лакокрасочная продукция",
            sub_category: [
               "Краски",
               "Строительные клеи",
               "Лаки",
               "Грунтовки",
               "Растворители",
            ],
         },
         {
            category: "Сухие строительные смеси",
            sub_category: [
               "Штукатурка",
               "Шпатлевки",
               "Цемент",
               "Строительный гипс",
               "Известь",
            ],
         },
         {
            category: "Сыпучие строительные материалы",
            sub_category: ["Песок", "Щебень", "Клинец", "Керамзит", "Асфальт"],
         },
         {
            category: "Герметики",
            sub_category: [
               "Силиконовые герметики",
               "Полиуретановые герметики",
               "Клеи-герметики",
               "Герметики и мастики",
               "Акриловые герметики",
            ],
         },

         { category: "Монтажные пены", sub_category: ["Монтажная пена"] },
         {
            category: "Стекла",
            sub_category: [
               "Opгстекло",
               "Стеклянные витражи",
               "Жидкое стекло",
               "Листовые прозрачные",
               "Узорчатые стекла",
            ],
         },
         {
            category: "Освещение и световые приборы",
            sub_category: [
               " Светодиодное освещение",
               "Промышленные приборы",
               "Портативное освещение",
               "Прочие освещение и световые приборы",
            ],
         },
         {
            category: "Кладочные материалы",
            sub_category: [
               "Сэндвич-панели",
               "Мрамор",
               "Газобетонные блоки",
               "Гранит",
               "Брусчатка",
            ],
         },
      ],
      category: [],
      sub_category: [],
      category_val: "",
      sub_category_val: "",
   }),
   methods: {
      selected() {
         this.categories.forEach((el) => {
            if (el.category == this.category_val) {
               this.sub_category = el.sub_category;
            }
         });
      },
      resetCategory() {
         this.sub_category_val = "";
      },
      productImage() {
         const file = this.image;
         !!file ? (this.product.image = URL.createObjectURL(file)) : null;
      },
      validateUpload() {
         const valid = this.$refs.form.validate();
         if (valid) {
            const get_data = localStorage.getItem("user");
            const user = JSON.parse(get_data);
            const user_token = user.token; // token only
            const config = {
               headers: {
                  "Content-Type": "multipart/form-data",
                  "x-auth-token": user_token,
               },
            };
            let formData = new FormData();
            formData.append("userId", this.product.user_id);
            formData.append("image", this.image);
            formData.append("category", this.sub_category_val.toLowerCase());
            formData.append("title", this.product.name);
            formData.append("price", this.product.price);
            formData.append("rating", this.product.rating);
            formData.append("description", this.product.description);
            formData.append("status", this.product.status);
            formData.append("company_name", user.user.company);
            formData.append("company_firstname", user.user.firstname);
            formData.append("company_lastname", user.user.lastname);
            formData.append("company_phone", user.user.phone);
            formData.append("company_address", user.user.address);
            formData.append("company_email", user.user.email);
            this.$axios
               .$post("/api/product", formData, config)
               .then((res) => {
                  this.$refs.form.reset();
                  this.product.image = null;
                  this.$toasted.success("Продукт добавлен", {
                     theme: "bubble",
                     position: "top-center",
                     duration: 5000,
                  });
               })
               .catch((error) => {
                  console.error(error);
                  this.$toasted.error("Bad request error !", {
                     theme: "bubble",
                     position: "top-center",
                     duration: 3000,
                  });
               });
         }
      },
   },
   watch: {
      category_val(v) {
         this.selected();
      },
   },
   mounted() {
      const get_data = localStorage.getItem("user");
      const user = JSON.parse(get_data);
      this.product.user_id = user.user._id;

      this.category = this.categories.map((elem) => elem.category);
   },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/product";
.v-rating {
   position: relative;
   z-index: 0 !important;
}
</style>
