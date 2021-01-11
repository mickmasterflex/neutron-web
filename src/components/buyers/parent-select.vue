<template>
  <v-select-field
    :options="siblings"
    field_id="parent"
    field_label="Parent"
    :loading="loading"
    v-model="inner_value"
  ></v-select-field>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import validation from '@/mixins/fields/validation'

export default {
  mixins: [validation],
  computed: {
    ...mapGetters({
      buyers: 'getAllBuyers',
      loading: 'getBuyersFetchLoading',
      siblings: 'getCurrentBuyerSiblings'
    })
  },
  methods: {
    ...mapActions({
      fetchBuyers: 'fetchBuyers'
    })
  },
  created () {
    if (!this.buyers.length) {
      this.fetchBuyers()
    }
  }
}
</script>
