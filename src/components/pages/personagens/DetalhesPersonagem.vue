<template>
  <div :class="{ 'px-4': isMobile }">
    <card
      :titulo="personagem.name"
      :imagem="'https://picsum.photos/300/300'"
      :tamanho="!isMobile ? '800' : ''"
      v-if="personagem.name"
    >
      <template v-slot:detalhes>
        <div class="my-4 text-subtitle-1">
          • Altura (cm): {{ personagem.height }}
        </div>
        <div class="my-4 text-subtitle-1">
          • Peso (kg): {{ personagem.mass }}
        </div>

        <div class="my-4 text-subtitle-1">• Filmes:</div>
        <v-expansion-panels multiple>
          <v-expansion-panel v-for="(filme, indice) in filmes" :key="indice">
            <v-expansion-panel-header
              class="text-uppercase font-weight-medium"
              >{{ filme.title }}</v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <div class="my-4 text-subtitle-1">
                • Diretor: {{ filme.director }}
              </div>
              <div class="my-4 text-subtitle-1">
                • Episódio: {{ filme.episode_id }}
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </template>
    </card>
    <div
      class="d-flex justify-center mt-15"
      v-if="!personagem.name && !loading"
    >
      <p class="text-h5 text-uppercase">Registro não encontrado</p>
    </div>
    <div class="d-flex justify-center mt-15">
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
    Card: () => import("@/components/molecules/Card.vue"),
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