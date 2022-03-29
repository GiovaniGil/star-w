<template>
  <v-text-field
    v-model="valorModel"
    v-bind="$attrs"
    @keyup.enter.native="$emit('search')"
    @click:clear="$emit('input', ''), $emit('search')"
    append-icon="mdi-magnify"
    hide-details
  />
</template>

<script>
export default {
  props: {
    valor: String,
  },
  computed: {
    valorModel: {
      get() {
        return this.valor;
      },
      set(valor) {
        this.$emit("input", valor);
      },
    },
  },
};
</script>

<style lang="sass" scoped>
</style>