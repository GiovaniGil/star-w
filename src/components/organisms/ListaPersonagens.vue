<template>
  <div class="people-list">
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="4"
        v-for="(personagem, indice) in listaPersonagens"
        :key="indice"
        class="people-details"
      >
        <card
          :titulo="personagem.name"
          :imagem="`https://picsum.photos/300/300?${
            new Date().getTime() + indice
          }`"
          class="people-details__info"
        >
          <template v-slot:detalhes>
            <div class="people-details__info">
              • Altura (cm): {{ personagem.height }}
            </div>
            <div class="people-details__info">
              • Peso (kg): {{ personagem.mass }}
            </div>
            <div class="people-details__info">
              • Nascimento: {{ personagem.birth_year }}
            </div>
          </template>
          <template v-slot:acoes>
            <custom-button
              label=" Ver detalhes"
              variant="primary"
              @click="
                $router.push({
                  name: 'detalhes',
                  params: { id: formattedNumber(personagem.url) },
                })
              "
            />
          </template>
        </card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "ListaPersonagens",

  components: {
    Card: () => import("@/components/molecules/CustomCard.vue"),
    CustomButton: () => import("@/components/atoms/CustomButton.vue"),
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
