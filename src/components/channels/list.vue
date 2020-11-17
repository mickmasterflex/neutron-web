<template>
  <div>
    <table v-if="channels" class="table">
      <thead>
      <tr>
        <th class="th">Name</th>
        <th class="th"></th>
      </tr>
      </thead>
      <tbody class="tbody">
      <tr class="tr" v-for="channel in channels" :key="channel.id">
        <td class="td">
          <router-link :to="{name: 'Channels', params: { id:channel.id }}" class="underline text-blue-500">{{channel.name}}</router-link>
        </td>
        <td class="td flex flex-row justify-end">
          <button @click="setCurrentAndOpenModal(channel)" class="btn btn-hollow-blue btn-circle"><font-awesome-icon icon="pencil-alt"></font-awesome-icon></button>
          <delete-channel :id="channel.id"></delete-channel>
        </td>
      </tr>
      </tbody>
      <update-channel></update-channel>
    </table>
    <div v-else>
      ...Loading...
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import deleteChannel from '@/components/channels/delete'
import updateChannel from '@/components/channels/update'

export default {
  props: {
    id: {
      type: Number
    }
  },
  components: {
    'delete-channel': deleteChannel,
    'update-channel': updateChannel
  },
  computed: {
    ...mapGetters({
      channels: 'getAllChannels'
    })
  },
  methods: {
    ...mapActions({
      fetchChannels: 'fetchChannels',
      fetchCurrentChannel: 'fetchCurrentChannel'
    }),
    ...mapMutations({
      showForm: 'SHOW_UPDATE_CHANNEL_FORM',
      setChannel: 'SET_CURRENT_CHANNEL'
    }),
    setCurrentAndOpenModal (channel) {
      this.showForm()
      this.setChannel(channel)
    }
  },
  created () {
    this.fetchChannels()
  }
}
</script>
