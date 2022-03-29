<template>
  <div>
    <div class="nav-bar">
      <router-link :to="{ name: 'home' }">
        <img :src="logo" class="nav-bar__logo" alt="logo" />
      </router-link>
      <custom-switch label="LighMode" @click="change" :value="lightMode" />
    </div>
    <div class="main">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import logo from "@/assets/logo.png";
import { mapActions, mapState } from "vuex";

export default {
  data: () => ({
    logo,
    lightMode: true,
  }),

  components: {
    CustomSwitch: () => import("@/components/atoms/CustomSwitch.vue"),
  },

  created() {
    this.lightMode = localStorage.getItem("dark_theme") !== "true";
    this.change(localStorage.getItem("dark_theme") !== "true");
  },

  computed: {
    ...mapState({
      colorMode: (state) => state.colorMode,
    }),
  },
  methods: {
    ...mapActions({
      setColorMode: "setColorMode",
    }),
    change(valor) {
      localStorage.setItem("dark_theme", !valor);
      this.setColorMode(valor ? "light" : "dark");

      document.body.classList.remove(!valor ? "light" : "dark");
      document.body.classList.add(valor ? "light" : "dark");
    },
  },
};
</script>

<style lang="sass">
.main
  padding-top: 10vh

.nav-bar
  display: flex
  justify-content: space-between
  padding: .5em 1em
  align-items: center
  box-shadow: 0 6px 6px -6px #222
  background-color: $background-light
  position: fixed
  width: 100%
  height: 8vh
  z-index: 1

  &__logo
    height: 40px

  &__switch
    position: relative
    display: inline-block
    width: 60px
    height: 34px

    &__input
      opacity: 0
      width: 0
      height: 0

    &__slider
      position: absolute
      cursor: pointer
      top: 0
      left: 0
      right: 0
      bottom: 0
      background-color: #ccc
      -webkit-transition: .4s
      transition: .4s

      &--round
        border-radius: 34px

        &:before
          border-radius: 50%

      &:before
        position: absolute
        content: ""
        height: 26px
        width: 26px
        left: 4px
        bottom: 4px
        background-color: #fff
        -webkit-transition: .4s
        transition: .4s

  &__switch
    &__input:checked + &__slider
      background-color: #2196F3

    &__input:focus + &__slider
      box-shadow: 0 0 1px #2196F3

    &__input:checked + &__slider:before
      -webkit-transform: translateX(26px)
      -ms-transform: translateX(26px)
      transform: translateX(26px)

.fade-enter-active,
.fade-leave-active
  transition-duration: 0.2s
  transition-property: opacity
  transition-timing-function: ease

.fade-enter,
.fade-leave-active
  opacity: 0
</style>