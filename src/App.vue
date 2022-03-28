<template>
  <Layout />
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    Layout: () => import("@/components/templates/DefaultTemplate.vue"),
  },

  beforeDestroy() {
    this.clearPeopleState();
    this.clearFilmsState();
  },
  methods: {
    ...mapActions({
      clearPeopleState: "peopleStore/clearState",
      clearFilmsState: "filmsStore/clearState",
    }),
  },
};
</script>
