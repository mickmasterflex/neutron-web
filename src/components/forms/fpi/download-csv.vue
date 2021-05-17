<template>
  <button @click="downloadCSV()" :disabled="loading" class="btn btn-indigo">
    <font-awesome-icon v-if="downloading" icon="spinner" pulse></font-awesome-icon>
    <font-awesome-icon v-else icon="download"></font-awesome-icon> Download FPI
  </button>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import dayjs from 'dayjs'

export default {
  props: {
    contract: {
      type: Object,
      required: true
    },
    contractLoading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      downloading: 'getFetchFpiDownloading'
    }),
    fpiFilename () {
      let contractSlug = this.contract.name
      contractSlug = contractSlug.toLowerCase().replace(/\s+/g, '-')
      return contractSlug + '--' + dayjs(new Date()).format('YYYY-MM-DD') + '--fpi'
    },
    loading () {
      return this.contractLoading ? this.contractLoading : this.downloading
    }
  },
  methods: {
    ...mapActions({
      fetchFpiCSV: 'fetchFpiCSV'
    }),
    async downloadCSV () {
      await this.fetchFpiCSV({
        id: this.contract.id,
        filename: this.fpiFilename
      })
    }
  }
}
</script>
