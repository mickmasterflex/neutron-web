<template>
  <div>
    <table v-if="contracts" class="w-full">
      <tr class="th-row">
        <th class="th">Name</th>
        <th class="th">Id</th>
        <th class="th">Parent</th>
        <th class="th">Client</th>
      </tr>
      <tr v-for="contract in contracts" :key="contract.id">
        <td class="td">
          <router-link :to="{name: 'PartnerContract', params: {client:contract.client, id:contract.id}}" class="underline text-blue-500">{{contract.name}}</router-link>
        </td>
        <td>{{ contract.id }}</td>
        <td>{{ contract.parent }}</td>
        <td>{{ contract.client }}</td>
      </tr>
    </table>
    <div v-else>
      ...Loading...
    </div>
  </div>
</template>

<script>
export default {
  props: ['contracts']
}
</script>
