<template>
  <div class="full-info container">
    <v-row>
      <v-col>
        <div class="full-info__image">
          <img :src="info.image" :alt="info.name" />
        </div>
      </v-col>
      <v-col>
        <h2 class="font-weight-medium">{{ info.name }}</h2>
        <v-rating
          v-model="info.rating"
          color="yellow darken-3"
          background-color="grey darken-1"
          empty-icon="$ratingFull"
          half-increments
          size="24"
          hover
          dense
          class="my-4"
        ></v-rating>
        <div class="text-h5">
          <span class="blue--text font-weight-medium">
            {{ info.price ? info.price.toLocaleString("en-US") : null }}
          </span>
          <span class="text-body-1">so'm / </span>
          <span class="text-body-1">tonna</span>
        </div>
        <div class="green--text text-body-2 mt-2 mb-5">Sotuvda mavjud</div>
        <div class="d-flex align-center messangers">
          <div class="text-caption mr-4">Поделиться</div>
          <v-icon color="blue" class="mr-1">mdi-twitter</v-icon>
          <v-icon color="red" class="mr-1">mdi-gmail</v-icon>
          <v-icon color="purple" class="mr-1">mdi-instagram</v-icon>
          <v-icon color="blue" class="mr-1">mdi-facebook</v-icon>
        </div>
        <v-row class="mt-10">
          <v-btn color="success" small @click="addToBasket(info)"
            >добавить корзину</v-btn
          >
          <v-btn color="primary" class="ml-5" small>купить </v-btn>
        </v-row>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col>
        <div class="info__company">
          <div class="info__company--title font-weight-bold mb-3">Продавец</div>
          <div class="info__company--name blue--text font-weight-bold text-h6">
            Metalbor
          </div>
          <v-rating
            v-model="company_rating"
            color="red darken-3"
            background-color="grey darken-1"
            empty-icon="$ratingFull"
            half-increments
            size="20"
            readonly
            dense
            class="mt-2 mb-4"
          ></v-rating>
          <p class="text-body-2">
            <v-icon color="red" size="18">mdi-map-marker</v-icon>
            улица Ракат, дом 4
          </p>
          <p class="text-body-2">
            <v-icon color="blue" size="18">mdi-web</v-icon>
            metalbor.uz
          </p>
          <p class="text-body-2">
            <v-icon color="green" size="18">mdi-phone</v-icon>
            +998(99) 403-68-28
          </p>
          <v-divider></v-divider>
          <div class="info__company--title font-weight-bold mt-2">
            Контактное лицо
          </div>
          <div class="info__user--avater d-flex align-center mt-3">
            <v-avatar>
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-avatar>
            <div class="ml-4">Усмон Назаров</div>
          </div>
          <p class="text-body-2 mt-3">
            <v-icon color="green" size="18">mdi-phone</v-icon>
            +998(99) 403-68-28
          </p>
          <p class="text-body-2 mt-3">
            <v-icon color="orange" size="18">mdi-email</v-icon>
            info@matalbor.uz
          </p>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-divider></v-divider>
      <div class="full__info--description">
        <div class="font-weight-bold text-h6 mt-2 mb-4">Описание</div>
        <div>
          <span class="description-title font-weight-medium">
            Балка Двутавровая широкополочная 3сп5
          </span>
          <p>
            Представляем вашему вниманию высококачественную двутавровую балку.
            Двутавровая балка - это стандартный профиль конструктивных
            элементов, относящийся к чёрному прокату и имеющий Н-образное
            сечение. Двутавровая балка в тридцать раз жестче и в семь раз
            прочнее балки квадратного профиля. Благодаря своим свойствам
            двутавровые балки получили большую популярность в строительстве
            перекрытий и мостовых сооружений. Также они могут использоваться для
            армирования шахтных стволов, в автомобильной промышленности и
            вагоностроении. Двутавровая балка изготовлена из высококачественных
            материалов, что в значимой степени повышает уровень надёжности,
            прочности и стойкости коррозию. У нас вы сможете приобрести
            двутавровую балку в хорошем качестве и по актуальной цене.
          </p>
        </div>
      </div>
    </v-row>
  </div>
</template>

<script>
export default {
  auth: false,
  data: () => ({
    info: {},
    company_rating: 4.5,
  }),
  methods: {
    addToBasket(e) {
      this.$store.state.basket.push(e);
      this.$toast.success("Product added !", {
        theme: "bubble",
        position: "top-left",
        duration: 5000,
      });
    },
  },
  async mounted() {
    const params = this.$route.params.id;
    await this.$axios
      .$get(`/api/product/${params}`)
      .then((res) => {
        this.info = res;
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style lang="scss" scoped>
.messangers {
  gap: 12px;
}
.messangers i {
  cursor: pointer;
  transition: all ease-in-out 0.2s;
  &:hover {
    transform: scale(1.2);
  }
}
</style>
