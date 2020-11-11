<template>
  <div>
    <table v-if="channels" class="table">
      <thead>
      <tr>
        <th class="th">Name</th>
      </tr>
      </thead>
      <tbody class="tbody">
      <tr class="tr" v-for="channel in this.channels" :key="channel.id">
        <td class="td">
          <router-link :to="{name: 'Channels', params: { id:channel.id }}" class="underline text-blue-500">{{channel.name}}</router-link>
          <delete-channel :id="channel.id"></delete-channel>
        </td>
      </tr>
      </tbody>
    </table>
    <div v-else>
      ...Loading...
    </div>
  </div>
</template>

<script>
import deleteChannel from '@/components/channels/delete'

export default {
  props: {
    channels: Array
  },
  components: {
    'delete-channel': deleteChannel
  }
}
</script>
