<template>
  <div>
    <table v-if="offers" class="w-full">
      <tr class="th-row">
        <th class="th">Name</th>
        <th class="th">ID</th>
        <th class="th">Contract</th>
        <th class="th">Product</th>
      </tr>
      <tr v-for="offer in this.offers" :key="offer.pk">
        <td class="td">
          <router-link :to="{name: 'Offer', params: {buyer:offer.contract, id:offer.pk}}" class="underline text-blue-500">{{offer.name}}</router-link>
        </td>
        <td>{{ offer.pk }}</td>
        <td>{{ offer.contract }}</td>
        <td>{{ offer.product }}</td>
      </tr>
    </table>
    <div v-else>
      ...Loading...
    </div>
  </div>
</template>

<script>
export default {
  props: { offers: Array }
}
</script>
