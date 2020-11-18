<template>
  <div>
    <table v-if="channels" class="table">
      <thead>
      <tr>
        <th class="th">Name</th>
        <th class="th w-24"></th>
      </tr>
      </thead>
      <tbody class="tbody">
      <tr class="tr" v-for="channel in channels" :key="channel.id">
        <td class="td">
          {{channel.name}}
        </td>
        <td class=" w-24 td flex flex-row justify-end">
          <button @click="setCurrentAndOpenForm(channel)" class="btn btn-hollow-blue btn-circle"><font-awesome-icon icon="pencil-alt"></font-awesome-icon></button>
          <delete-channel :id="channel.id"></delete-channel>
        </td>
      </tr>
      <update-channel></update-channel>
      </tbody>
    </table>
    <table-empty-state v-else heading="No Channels" copy="Use the 'New Channel' button to add channels."></table-empty-state>
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
    setCurrentAndOpenForm (channel) {
      this.showForm()
      this.setChannel(channel)
    }
  },
  created () {
    this.fetchChannels()
  }
}
</script>
