export default {
  data: () => ({
    loader: null,
  }),

  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.mobile;
    },
  },

  watch: {
    loading: {
      handler(value) {
        if (value === true) this.loader = this.$loading.show();
        else this.loader.hide();
      },
    },
  },
};
