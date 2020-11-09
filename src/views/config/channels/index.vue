<template>
  <content-layout>
    <template v-slot:hud>
      <h1 class="text-white text-4xl font-hairline">All Channels</h1>
    </template>
    <template v-slot:content>
      <action-heading>
        <template v-slot:left>
          <h2 class="h3">Channels</h2>
        </template>
        <template v-slot:right>
          <create-channel></create-channel>
        </template>
      </action-heading>
      <channels-list :channels="channelsList" class="mt-5"></channels-list>
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
      channelsList: 'getAllChannels'
    })
  },
  methods: {
    ...mapActions({
      fetchChannels: 'fetchChannels'
    }),
    ...mapMutations({
      showCreateChannelModal: 'SHOW_CREATE_CHANNEL_MODAL'
    })
  },
  created () {
    this.fetchChannels()
  }
}
</script>
