<template>
  <button @click="downloadCSV()" :disabled="loading" class="btn btn-indigo">
    <font-awesome-icon v-if="loading" icon="spinner" pulse></font-awesome-icon>
    <font-awesome-icon v-else icon="download"></font-awesome-icon> Download as CSV
  </button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    contractId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    ...mapActions({
      fetchFpiCSV: 'fetchFpiCSV'
    }),
    async downloadCSV () {
      this.loading = true
      await this.fetchFpiCSV(this.contractId).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
