<template>
   <div class="container">
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
   </div>
</template>

<script>
export default {
   data: () => ({
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
   },
   watch: {
      category_val(v) {
         this.selected();
      },
   },
   mounted() {
      this.category = this.categories.map((elem) => elem.category);
   },
};
</script>

<style></style>
