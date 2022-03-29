<template>
  <div class="people-details">
    <card
      :titulo="personagem.name"
      :imagem="'https://picsum.photos/300/300'"
      tamanho="400px"
      v-if="personagem.name"
    >
      <template v-slot:detalhes>
        <div class="people-details__info">
          • Altura (cm): {{ personagem.height }}
        </div>
        <div class="people-details__info">
          • Peso (kg): {{ personagem.mass }}
        </div>

        <div class="people-details__info">• Filmes:</div>
        <v-expansion-panels multiple class="people-details__films">
          <v-expansion-panel v-for="(filme, indice) in filmes" :key="indice">
            <v-expansion-panel-header class="people-details__films__title">{{
              filme.title
            }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="people-details__films__info">
                • Diretor: {{ filme.director }}
              </div>
              <div class="people-details__films__info">
                • Episódio: {{ filme.episode_id }}
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </template>
    </card>
    <div class="people-details__disclaimer" v-if="!personagem.name && !loading">
      <p class="">Registro não encontrado</p>
    </div>
    <div class="people-details__link">
      <router-link :to="{ name: 'home' }">Voltar</router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import uiMixins from "@/app/mixins/uiMixins";

export default {
  name: "DetalhesPersonagem",

  mixins: [uiMixins],

  components: {
    Card: () => import("@/components/molecules/CustomCard.vue"),
  },

  data: () => ({
    filmes: [],
    loadingTemp: false,
  }),

  async created() {
    if (this.$route.params.id) {
      await this.setPeopleData(this.$route.params.id)
        .then(async ({ data }) => {
          if (data.name) {
            this.loadingTemp = true;
            await Promise.all(
              data.films.map((filme) => {
                return this.setFilmData(this.formattedNumber(filme)).then(
                  ({ data: filmeData }) => {
                    this.filmes.push(filmeData);
                  }
                );
              })
            ).then((results) => {
              if (results.length === data.films.length)
                this.loadingTemp = false;
            });
          }
        })
        .catch((erro) => {
          this.$toasted.error(`Erro: ${erro}`, {
            position: "top-center",
            duration: 2000,
          });
        });
    } else {
      this.$router.push("/");
    }
  },

  methods: {
    ...mapActions({
      setPeopleData: "peopleStore/setData",
      setFilmData: "filmsStore/setData",
    }),
    formattedNumber(data) {
      return Number(data.match(/\d+/g).join());
    },
  },

  computed: {
    ...mapState({
      loadingPersonagem: (state) => state.peopleStore.loading,
      loadingFilmes: (state) => state.filmsStore.loading,
      personagem: (state) => state.peopleStore.data,
      filmeInfo: (state) => state.filmsStore.data,
    }),
    loading() {
      return this.loadingPersonagem || this.loadingFilmes || this.loadingTemp;
    },
  },
};
</script>

<style lang="sass">
.people-details
  display: flex
  align-items: center
  flex-direction: column
  margin-top: 3em

  &__info
    margin: .5em 0

  &__films
    &__title
      font-weight: 700
      font-size: 1.2em
    &__info
      margin: .5em 0

  &__disclaimer
    font-size: 2em
    margin: 1em 0

  &__link
    font-size: 1.2em
    margin: 1em 0
    a
      text-decoration: none
      color: $primary
</style>