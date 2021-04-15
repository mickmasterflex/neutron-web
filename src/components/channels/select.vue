<template>
  <v-select-field
    :loading="loading"
    v-model="inner_value"
    :options="channels"
    field_label="Channel"
    field_id="channel"
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
      channels: 'getAllChannels',
      loading: 'getChannelsFetchLoading'
    })
  },
  methods: {
    ...mapActions({
      fetchChannels: 'fetchChannels'
    })
  },
  created () {
    this.fetchChannels()
  }
}
</script>
