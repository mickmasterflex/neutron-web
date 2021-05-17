<template>
  <panel-template title="Active Channels"
                  :action-transition="true"
                  :show-loader="loading"
                  :loading-text="loadingText">
    <template v-slot:content>
      <div class="form-horizontal">
        <table-empty-state
          v-if="!available_channels.length"
          heading="No channels exist"
        >
          <template slot="copy">Create new channels <router-link class="text-link" :to="{ name: 'Channels' }">here</router-link></template>
        </table-empty-state>
        <div class="field-group"
             v-for="channel in available_channels"
             :key="`channel-` + channel.id">
          <check-switch :value="channels.includes(channel.id)"
                        :field_id="`channel-` + channel.id"
                        @input="submitForm(channel.id, $event)"/>
          <label class="text-left ml-2 cursor-pointer" :for="`channel-` + channel.id">{{channel.name}}</label>
        </div>
      </div>
    </template>
  </panel-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      channels: [],
      updatingChannels: false
    }
  },
  props: {
    buyer: Object
  },
  methods: {
    ...mapActions({
      update: 'updateBuyer',
      fetchChannels: 'fetchChannels'
    }),
    setChannels () {
      this.channels = this.buyer.channels
    },
    async submitForm (channelId, value) {
      this.updatingChannels = true
      let updatedChannels = [...this.channels]
      if (value) {
        updatedChannels = updatedChannels.concat([channelId])
      } else {
        updatedChannels = updatedChannels.filter(id => id !== channelId)
      }
      const updatedBuyer = { ...this.buyer }
      updatedBuyer.channels = updatedChannels
      await this.update(updatedBuyer)
        .finally(() => {
          this.updatingChannels = false
        })
    }
  },
  watch: {
    buyer () {
      this.setChannels()
    }
  },
  created () {
    this.fetchChannels()
  },
  computed: {
    ...mapGetters({
      available_channels: 'getAllChannels',
      loadingChannels: 'getChannelsFetchLoading',
      loadingBuyer: 'getBuyerFetchLoading',
      loadingBuyerText: 'getBuyerFetchLoadingText',
      loadingChannelsText: 'getChannelsFetchLoadingText'
    }),
    loading () {
      if (this.loadingChannels) {
        return this.loadingChannels
      } else if (this.loadingBuyer) {
        return this.loadingBuyer
      } else {
        return this.updatingChannels
      }
    },
    loadingText () {
      if (this.loadingChannels) {
        return this.loadingChannelsText
      } else if (this.loadingBuyer) {
        return this.loadingBuyerText
      } else {
        return 'Updating Channels'
      }
    }
  }
}
</script>
