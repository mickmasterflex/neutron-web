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
      partners: 'getAllPartners',
      loading: 'getPartnersFetchLoading',
      siblings: 'getCurrentPartnerSiblings'
    })
  },
  methods: {
    ...mapActions({
      fetchPartners: 'fetchPartners'
    })
  },
  created () {
    if (!this.partners.length) {
      this.fetchPartners()
    }
  }
}
</script>
