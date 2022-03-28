<template>
  <v-card
    :loading="loading"
    class="mx-auto my-2"
    :max-width="tamanho"
    v-bind="$attrs"
  >
    <v-img height="250" lazy :src="imagem"></v-img>
    <v-card-title>{{ titulo }}</v-card-title>

    <v-card-text>
      <slot name="detalhes" />
    </v-card-text>
    <v-divider class="mx-4" v-if="!!this.$slots.acoes"></v-divider>
    <v-card-actions> <v-spacer /><slot name="acoes" /> </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    titulo: String,
    loading: {
      type: Boolean,
    },
    imagem: {
      type: String,
      required: true,
    },
    tamanho: { type: String, default: "374" },
  },
};
</script>