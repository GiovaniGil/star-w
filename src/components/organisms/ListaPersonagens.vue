<template>
  <v-container class="grey lighten-5 mb-6" :loading="loading">
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="4"
        v-for="(personagem, indice) in listaPersonagens"
        :key="indice"
      >
        <card
          :titulo="personagem.name"
          :imagem="'https://picsum.photos/300/300'"
        >
          <template v-slot:detalhes>
            <div class="my-4 text-subtitle-1">
              • Altura (cm): {{ personagem.height }}
            </div>
            <div class="my-4 text-subtitle-1">
              • Peso (kg): {{ personagem.mass }}
            </div>
            <div class="my-4 text-subtitle-1">
              • Nascimento: {{ personagem.birth_year }}
            </div>
          </template>
          <template v-slot:acoes>
            <v-btn
              color="secondary"
              class="ma-2"
              :to="{
                name: 'detalhes',
                params: { id: formattedNumber(personagem.url) },
              }"
            >
              Ver detalhes
            </v-btn>
          </template>
        </card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ListaPersonagens",

  components: {
    Card: () => import("@/components/molecules/Card.vue"),
  },

  props: {
    listaPersonagens: {
      type: Array,
      required: true,
    },
    loading: Boolean,
  },

  methods: {
    formattedNumber(data) {
      return Number(data.match(/\d+/g).join());
    },
  },
};
</script>
