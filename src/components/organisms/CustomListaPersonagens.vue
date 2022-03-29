<template>
  <div class="people-list">
    <div class="people-list__row">
      <div
        v-for="(personagem, indice) in listaPersonagens"
        :key="indice"
        class="people-list__item"
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
      </div>
    </div>
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

<style lang="sass">
.people-list
  margin: 0 auto

  &__row
    display: flex
    flex-flow: row wrap
    justify-content: center

  &__item
    flex-basis: 33.33%
    -ms-flex: auto
    position: relative
    padding: 1em
    box-sizing: border-box
</style>