<template>
  <v-container>
    <section class="mt-5">
      <input-busca
        v-model="search"
        @search="buscar"
        outlined
        block
        placeholder="Digite o nome e pressione enter"
        clearable
      />
    </section>
    <section class="mt-5">
      <lista-personagens :listaPersonagens="peopleList" :loading="loading" />
    </section>
    <section>
      <paginador
        :valor="pagination.page"
        circulo
        :desabilitado="loading"
        :quantidade="pagination.limit"
        :visiveis="visiveis"
        @input="paginar"
      />
    </section>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import uiMixins from "@/app/mixins/uiMixins";

export default {
  name: "ListaPersonagems",

  mixins: [uiMixins],

  components: {
    Paginador: () => import("@/components/molecules/Paginador.vue"),
    InputBusca: () => import("@/components/molecules/InputBusca.vue"),
    ListaPersonagens: () =>
      import("@/components/organisms/ListaPersonagens.vue"),
  },

  data: () => ({
    search: "",
  }),

  async created() {
    await this.handleDados().catch((erro) => {
      this.$toasted.error(`Erro: ${erro}`, {
        position: "top-center",
        duration: 2000,
      });
    });
  },

  computed: {
    ...mapState({
      loading: (state) => state.peopleStore.loading,
      pagination: (state) => state.peopleStore.pagination,
      peopleList: (state) => state.peopleStore.list,
    }),
    visiveis() {
      return this.pagination.count > 10 ? 10 : 1;
    },
  },

  methods: {
    ...mapActions({
      peopleSetDataToList: "peopleStore/setDataToList",
    }),
    async paginar(pagina) {
      await this.handleDados({ page: pagina });
    },
    async buscar() {
      await this.handleDados({ search: this.search });
    },
    async handleDados(data) {
      await this.peopleSetDataToList(data);
    },
  },
};
</script>
