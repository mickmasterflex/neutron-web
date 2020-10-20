export const plural = {
  methods: {
    plural (value, len) {
      return len !== 1 ? value + 's' : value
    }
  }
}
