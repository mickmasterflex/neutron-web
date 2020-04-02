<template>
  <div>
    <table v-if="contracts" class="w-full">
      <tr class="th-row">
        <th class="th">Name</th>
        <th class="th">Parent</th>
      </tr>
      <tr v-for="contract in contracts" :key="contract.id">
        <td class="td">
          <router-link :to="{name: 'PartnerContract', params: {contract:contract.id}}" class="underline text-blue-500">{{contract.name}}</router-link>
        </td>
        <td>
          {{ contract.parent }}
        </td>
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
