<template>
  <content-layout>
    <template v-slot:hud-content>
      <h1 class="text-white text-4xl font-hairline">All Channels</h1>
    </template>
    <template v-slot:content>
      <panel-template title="Channels" :showLoader="loading" :loadingText="loadingText">
        <template slot="action">
          <create-channel></create-channel>
        </template>
        <template slot="content">
          <channels-list :channels="channelsList"></channels-list>
        </template>
      </panel-template>
    </template>
  </content-layout>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import getAllChannels from '@/components/channels/list'
import createChannel from '@/components/channels/create'

export default {
  components: {
    'channels-list': getAllChannels,
    'create-channel': createChannel
  },
  computed: {
    ...mapGetters({
      channelsList: 'getAllChannels',
      loading: 'getChannelsFetchLoading',
      loadingText: 'getChannelsFetchLoadingText'
    })
  },
  methods: {
    ...mapActions({
      fetchChannels: 'fetchChannels'
    }),
    ...mapMutations({
      resetBreadcrumbs: 'RESET_CURRENT_BREADCRUMBS'
    })
  },
  created () {
    this.resetBreadcrumbs()
    this.fetchChannels()
  }
}
</script>
