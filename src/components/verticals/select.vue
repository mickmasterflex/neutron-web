<template>
  <v-select-field
    :loading="loading"
    v-model="inner_value"
    :options="verticals"
    field_label="Vertical"
    field_id="vertical"
    v-bind="$attrs"
    :rules="rules"
  ></v-select-field>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import validation from '@/mixins/fields/validation'

export default {
  mixins: [validation],
  computed: {
    ...mapGetters({
      verticals: 'getAllVerticals',
      loading: 'getVerticalsFetchLoading'
    })
  },
  methods: {
    ...mapActions({
      fetchVerticals: 'fetchVerticals'
    })
  },
  created () {
    this.fetchVerticals()
  }
}
</script>
