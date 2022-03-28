<template>
  <div class="text-center">
    <v-pagination
      v-model="valorModel"
      :length="quantidade"
      :circle="circulo"
      :disabled="desabilitado"
      :total-visible="visiveis"
    />
  </div>
</template>

<script>
export default {
  props: {
    circulo: Boolean,
    desabilitado: Boolean,
    quantidade: {
      type: Number,
      required: true,
    },
    visiveis: {
      type: Number,
      required: true,
    },
    valor: {
      type: Number,
      deafult: 1,
    },
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