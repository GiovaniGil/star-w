<template>
  <button class="button" :class="`button--${variant}`" @click="$emit('click')">
    {{ label }}
  </button>
</template>

<script>
export default {
  props: {
    label: String,
    variant: {
      type: String,
      default: "primary",
    },
  },
};
</script>

<style lang="sass">
.button
  border: none
  padding: 15px 32px
  text-align: center
  text-decoration: none
  display: inline-block
  font-size: 16px
  margin: 4px 2px
  cursor: pointer
  border-radius: .5em
  font-weight: 700
  color: #fff

  &--primary
    background-color: $primary

  &--secondary
    background-color: $secondary
</style>