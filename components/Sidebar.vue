<template>
  <div>
    <v-navigation-drawer v-model="$store.state.sidebar" fixed clipped app>
      <v-list-item>
        <!-- <v-list-item-title> Category </v-list-item-title> -->
        <h1 class="ml-8">
          <v-icon color="primary">mdi-shape</v-icon> Category
        </h1>
        <v-list-item-content> </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-expansion-panels>
        <v-expansion-panel v-for="(item, i) in categories" :key="i">
          <v-expansion-panel-header>
            {{ item.category }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-list dense>
              <v-list-item
                link
                v-for="(ctg, idx) in item.sub_category"
                :key="idx"
                router
                @click.prevent="$router.push(`/product/${ctg.toLowerCase()}/`)"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{ ctg }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    clipped: true,
    drawer: null,
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
  }),
  computed: {
    // openMenu() {
    //    return this.$store.state.sidebar;
    // },
  },
};
</script>

<style></style>
