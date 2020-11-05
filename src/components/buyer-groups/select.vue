<template>
  <v-select-field
    :loading="loading"
    :options="buyerGroups"
    field_id="buyerGroups"
    field_label="Buyer Group"
    v-bind="$attrs"
    :rules="rules"
    v-model="inner_value"
  ></v-select-field>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import validation from '@/mixins/fields/validation'

export default {
  mixins: [validation],
  computed: {
    ...mapGetters({
      buyerGroups: 'getBuyerGroups',
      loading: 'getBuyerGroupsFetchLoading'
    })
  },
  methods: {
    ...mapActions({
      fetchBuyerGroups: 'fetchBuyerGroups'
    }),
    ...mapMutations({
      setBuyersGroupFetchLoading: 'SET_BUYER_GROUPS_FETCH_LOADING'
    })
  },
  created () {
    this.setBuyersGroupFetchLoading()
    this.fetchBuyerGroups()
  }
}
</script>
