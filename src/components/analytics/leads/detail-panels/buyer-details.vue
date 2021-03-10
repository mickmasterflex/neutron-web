<template>
  <panel-template title="Buyer Client Details">
    <template v-slot:content>
      <transition-table-state>
        <table class="table table-white" v-if="tableData.buyer_client">
          <thead class="thead">
            <tr class="tr">
              <th class="th w-24">Data</th>
              <th class="th">Name</th>
              <th class="th w-24">Id</th>
            </tr>
          </thead>
          <tbody>
            <tr class="tr">
              <td class="td font-bold">Client</td>
              <td class="td">
                <router-link class="text-link" :to="{ name: 'Client', params: { slug: tableData.buyer_client.slug } }">
                  {{ tableData.buyer_client.name }}
                </router-link>
              </td>
              <td class="td">{{ tableData.buyer_client.id }}</td>
            </tr>
            <tr class="tr">
              <td class="td font-bold">Buyer</td>
              <td class="td">
                <router-link class="text-link" :to="{ name: 'BuyerContract', params: { id: tableData.buyer_contract.id, client: tableData.buyer_client.slug } }">
                  {{ tableData.buyer_contract.name }}
                </router-link>
              </td>
              <td class="td">{{ tableData.buyer_contract.id }}</td>
            </tr>
            <tr class="tr">
              <td class="td font-bold">Offer</td>
              <td class="td">
                <router-link class="text-link" :to="{ name: 'OfferDetails', params: { id: tableData.offer_contract.id, buyer: tableData.buyer_contract.id, client: tableData.buyer_client.slug } }">
                  {{ tableData.offer_contract.name }}
                </router-link>
              </td>
              <td class="td">{{ tableData.offer_contract.id }}</td>
            </tr>
          </tbody>
        </table>
        <table-empty-state v-else
                           heading="No Buyer Client Data"
                           key="empty"></table-empty-state>
      </transition-table-state>
    </template>
  </panel-template>
</template>

<script>
export default {
  props: {
    tableData: {
      default: () => {
        return {}
      },
      type: Object
    },
    title: String
  }
}
</script>
