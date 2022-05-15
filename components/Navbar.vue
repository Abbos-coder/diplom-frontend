<template>
  <nav class="navbar">
    <v-app-bar elevation="1" height="35" :clipped-left="clipped" app>
      <v-row class="navbar mx-auto px-n2" align="center" justify="center">
        <div class="navbar__block mr-2">
          <div class="navbar__phone text-caption">
            <v-icon small color="blue darken-2" class="mr-1">
              mdi-phone
            </v-icon>
            <strong>
              <span>Call us now:</span>
              <a href="tel:+998994036828">+998 99 403-68-28</a>
            </strong>
          </div>
        </div>
        <v-spacer class="d-none d-sm-block"></v-spacer>
        <div class="navbar__block lang d-flex ml-1">
          <p class="text-body-2 mt-0 mb-0 lang">
            <span>UZ</span> | <span>RU</span>
          </p>
          <div class="text-caption ml-4 conroller">
            <nuxt-link to="/auth" v-if="!$store.state.logged_in">
              Sign in
            </nuxt-link>

            <div
              v-else
              class="user-name primary--text font-weight-medium text-body-2 ml-2"
              @click="openProfile"
            >
              {{ user_name }}
              <v-icon color="primary">mdi-chevron-down</v-icon>
              <div class="profile">
                <nuxt-link to="/upload">
                  <v-icon class="mr-2" size="22">
                    mdi-plus-circle-outline
                  </v-icon>
                  Добавить продукт
                </nuxt-link>
                <nuxt-link to="/my-products">
                  <v-icon class="mr-2" size="22"> mdi-store </v-icon>
                  Мои продукты
                </nuxt-link>
                <nuxt-link to="/">
                  <v-icon size="22" class="mr-2">mdi-cog-outline</v-icon>
                  Редактировать профиль
                </nuxt-link>
                <div @click="logOut">
                  <v-icon class="mr-2" size="22">mdi-logout</v-icon>
                  Выйти
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-row>
    </v-app-bar>

    <div class="container mx-auto mt-md-n2 mt-sm-n2 navbar__controls">
      <div>
        <nuxt-link to="/">
          <img src="@/assets/img/logo.jpg" alt="logo" class="logo" />
        </nuxt-link>
      </div>
      <div class="navbar__search mt-2">
        <v-text-field
          dense
          append-icon="mdi-magnify"
          label="Search"
          placeholder="Search..."
          solo
          class="mt-4"
        ></v-text-field>
      </div>
      <v-btn to="/basket" color="primary" class="text-capitalize">
        <v-icon>mdi-cart</v-icon>
        <span>Your cart: {{ $store.state.basket.length }}</span>
      </v-btn>
    </div>
    <div class="navbar__menu container mb-1">
      <div class="navbar__bars" @click="openSidebar">
        <v-icon color="primary">mdi-menu</v-icon>
      </div>
      <nuxt-link to="/" class="blue--text text--darken-3 text-bold">
        All products
      </nuxt-link>
      <nuxt-link to="/about" class="blue--text text--darken-3 text-bold">
        About us
      </nuxt-link>
      <nuxt-link to="/contact" class="blue--text text--darken-3 text-bold">
        Contact
      </nuxt-link>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    user_name: "",
    clipped: true,
  }),
  methods: {
    openSidebar() {
      this.$store.state.sidebar = !this.$store.state.sidebar;
    },
    logOut() {
      this.$auth.logout();
      localStorage.removeItem("user");
      window.location.reload();
    },
    openProfile() {
      const profile = document.querySelector(".profile");
      profile.classList.toggle("active");
    },
  },
  mounted() {
    const user = localStorage.getItem("user");
    const user_name = JSON.parse(user);
    !!user
      ? ((this.user_name = user_name.user.firstname),
        (this.$store.state.logged_in = true))
      : null;
  },
};
</script>

<style lang="scss" scoped>
.profile {
  transform: translateY(50px);
  opacity: 0;
  visibility: hidden;
  @include trs;
  border: 1px solid #ccc;
  position: absolute;
  top: 30px;
  right: 0;
  color: #333;
  width: 300px;
  display: flex;
  flex-direction: column;
  height: auto;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 10px;
  &.active {
    transform: translateY(0px);
    opacity: 1;
    visibility: visible;
  }
  a {
    color: #333;
    font-weight: 500 !important;
    margin: 0 !important;
    line-height: 3;
    border-radius: 16px;
    @include trs;
    &:hover {
      background: #e8e6e6;
      padding-left: 15px;
    }
  }
  div {
    line-height: 3;
    @include trs;
    border-radius: 16px;
    &:hover {
      padding-left: 15px;
      background: #e8e6e6;
    }
  }
}
.conroller {
  position: relative;
}
.user-name {
  position: relative;
  display: inline-block;
  cursor: pointer;
  transition: all linear 0.1s;
  &:hover,
  &:hover > i.v-icon {
    color: blue !important;
  }
}
body {
  font-family: Arial, Helvetica, sans-serif;
}
.logo {
  height: 75px;
}
.lang {
  span {
    cursor: pointer;
    font-weight: 500;
  }
}
.v-toolbar {
  @media (max-width: 414px) {
    height: 60px !important;
    padding-top: 10px;
  }
  @media (max-width: 450px) {
    height: 60px !important;
    margin-top: 20px;
  }
  .lang {
    margin-top: 7px;
    a {
      text-decoration: none;
      font-weight: bold;
      margin-left: 5px;
    }
  }
  .navbar__phone {
    a {
      text-decoration: none;
      margin-left: 5px;
    }
  }
  .navbar__search {
    width: 100%;
  }
}
.navbar {
  &__controls {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    @media (max-width: 640px) {
      flex-direction: column;
      .v-btn {
        margin-left: 0 !important;
      }
    }
  }
  &__search {
    @media (max-width: 900px) {
      width: min(100%, 375px);
    }
    @media (max-width: 775px) {
      width: min(100%, 250px);
    }
    @media (max-width: 640px) {
      width: min(100%, 375px);
      margin-top: -25px !important;
    }
    width: min(100%, 500px);
    margin: 0 auto;
  }
  &__menu {
    display: flex;
    justify-content: center;
    gap: 40px;
    border-bottom: 1px solid #3333;
    padding-bottom: 15px;
    a {
      text-decoration: none;
      font-weight: 500;
      font-size: 16px;
    }
  }
  &__bars {
    cursor: pointer;
    margin-right: auto;
  }
}
</style>
