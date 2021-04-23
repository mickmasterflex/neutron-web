export const ancestorName = {
  methods: {
    ancestorName (contractId) {
      return this.getAncestorById(contractId) ? this.getAncestorById(contractId).name : contractId
    }
  }
}
