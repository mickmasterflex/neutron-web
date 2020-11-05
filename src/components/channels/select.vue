<template>
  <v-select-field
    :loading="loading"
    v-model="inner_value"
    :options="channels"
    field_label="Channels"
    field_id="channels"
    v-bind="$attrs"
    :rules="rules"
  ></v-select-field>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
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
    }),
    ...mapMutations({
      setChannelsFetchLoading: 'SET_CHANNELS_FETCH_LOADING'
    })
  },
  created () {
    this.setChannelsFetchLoading()
    this.fetchChannels()
  }
}
</script>
