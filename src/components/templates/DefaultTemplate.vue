<template>
  <v-app>
    <v-app-bar app class="pa-2">
      <router-link :to="{ name: 'home' }">
        <img :src="logo" class="ml-sm-8 logo" alt="logo" />
      </router-link>
      <v-spacer />
      <v-switch v-model="lightMode" inset label="Light" @change="change" />
    </v-app-bar>
    <v-main class="mt-5">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </v-main>
  </v-app>
</template>

<script>
import logo from "@/assets/logo.png";
import { mapActions } from "vuex";

export default {
  data: () => ({
    logo,
    lightMode: true,
  }),

  created() {
    this.lightMode = localStorage.getItem("dark_theme") !== "true";
    this.change(localStorage.getItem("dark_theme") !== "true");
  },

  computed: {},
  methods: {
    ...mapActions({
      setColorMode: "setColorMode",
    }),
    change(valor) {
      localStorage.setItem("dark_theme", !valor);
      this.$vuetify.theme.dark = !valor;
      this.setColorMode(valor ? "light" : "dark");
    },
  },
};
</script>

<style lang="sass">
.fade-enter-active,
.fade-leave-active
  transition-duration: 0.2s
  transition-property: opacity
  transition-timing-function: ease

.fade-enter,
.fade-leave-active
  opacity: 0

.logo
  height: 40px

.v-toolbar__content
  align-items: flex-end !important
</style>