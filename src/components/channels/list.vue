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
          <router-link :to="{name: 'Channel', params: { id:channel.id }}" class="underline text-blue-500">{{channel.name}}</router-link>
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
export default {
  props: {
    channels: Array
  }
}
</script>
