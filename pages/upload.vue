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
            v-model="product.category"
            :items="items"
            label="Category"
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
          <v-text-field
            v-model="product.rating"
            type="number"
            label="Рейтинг"
            hide-spin-buttons
            :rules="[(v) => !!v || 'This is required']"
          ></v-text-field>
          <v-switch
            v-model="product.status"
            :label="`Складъ: ${product.status ? 'в наличии' : 'нет в наличии'}`"
          ></v-switch>
        </v-form>
        <v-row>
          <v-btn color="primary" class="mt-4 ml-auto" @click="validateUpload">
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
      image: "",
      category: "",
      name: "",
      price: null,
      rating: null,
      status: false,
    },

    items: [
      "Арматура",
      "Стальные балки",
      "Проволоки",
      "Рулонные стали",
      "Краски",
      "Строительные клеи",
      "Лаки",
      "Грунтовки",
      "Растворители",
      "Штукатурка",
      "Шпатлевки",
      "Цемент",
      "Строительный гипс",
      "Известь",
      "Песок",
      "Щебень",
      "Клинец",
      "Керамзит",
      "Асфальт",
      "Силиконовые герметики",
      "Полиуретановые герметики",
      "Клеи-герметики",
      "Герметики и мастики",
      "Акриловые герметики",
      "Стекло",
      "Стеклянные витражи",
      "Жидкое стекло",
      "Листовые прозрачные",
      "Узорчатые стекла",
      "Светодиодное освещение",
      "Промышленные приборы",
      "Портативное освещение",
      "Прочие освещение и световые приборы",
      "Сэндвич-панели",
      "Мрамор",
      "Газобетонные блоки",
      "Гранит",
      "Брусчатка",
    ],
  }),
  methods: {
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
        formData.append("image", this.image);
        formData.append("category", this.product.category.toLowerCase());
        formData.append("title", this.product.title);
        formData.append("price", this.product.price);
        formData.append("rating", this.product.rating);
        formData.append("status", this.product.status);
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
          });
      }
    },
  },
  mounted() {
    // console.log("token" + this.$auth.strategy.token.get());
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
