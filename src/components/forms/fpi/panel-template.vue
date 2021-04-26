<template>
  <panel-template
    title="FPI"
    content-background-color="white"
    :show-loader="loading"
    :loading-text="loadingText"
  >
    <template slot="content">
      <fpi-table :fpi="fpi"></fpi-table>
    </template>
  </panel-template>
</template>

<script>
import { mapGetters } from 'vuex'
import fpiTable from '@/components/forms/fpi/list'

export default {
  computed: {
    ...mapGetters({
      loading: 'getFetchFpiLoading',
      loadingText: 'getFetchFpiLoadingText',
      fpi: 'getCurrentFpi'
    })
  },
  components: {
    'fpi-table': fpiTable
  }
}
</script>
