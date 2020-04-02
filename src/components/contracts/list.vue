<template>
  <div>
    <table v-if="contracts" class="w-full">
      <tr class="th-row">
        <th class="th">Name</th>
      </tr>
      <tr v-for="contract in contracts" :key="contract.id">
        <td class="td">
          <router-link :to="{name: 'BuyerContract', params: {contract:contract.id}}" class="underline text-blue-500">{{contract.name}}</router-link>
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
