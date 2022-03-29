<template>
  <div class="custom-card" :style="{ 'max-width': tamanho }" v-bind="$attrs">
    <img :src="imagem" :alt="titulo" />
    <p class="custom-card__title">{{ titulo }}</p>

    <div class="custom-card__details">
      <slot name="detalhes" />
    </div>
    <hr class="custom-card__divider" v-if="!!this.$slots.acoes" />
    <slot name="acoes" />
  </div>
</template>

<script>
export default {
  name: "CustomCard",

  props: {
    titulo: String,

    imagem: {
      type: String,
      required: true,
    },
    tamanho: { type: String, default: "374" },
  },
};
</script>

<style lang="sass">
.custom-card
  display: flex
  flex-direction: column
  background-color: $background

  &__title
    font-weight: 700
    font-size: 1.125em
    margin: .5em 0

  &__divider
    height: 0
    border-top: 1px solid rgba(0, 0, 0, 0.1)
    border-bottom: 1px solid rgba(255, 255, 255, 0.3)
    margin: 1.025em 0

  &__title,
  &__details
    padding: 0 .5em
</style>