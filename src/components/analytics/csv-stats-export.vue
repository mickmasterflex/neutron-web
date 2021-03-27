<template>
  <button
    class="btn btn-indigo"
    :disabled="loading"
    @click="$emit('click')">
    <font-awesome-icon icon="download"></font-awesome-icon> {{ buttonText }}
  </button>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    buttonActionText: {
      type: String,
      default: 'Export Leads'
    }
  },
  computed: {
    ...mapGetters({
      loading: 'getAnalyticsFetchCSVLoading'
    }),
    buttonText () {
      if (this.loading) {
        return 'Downloading'
      }
      return this.buttonActionText
    }
  }
}
</script>
