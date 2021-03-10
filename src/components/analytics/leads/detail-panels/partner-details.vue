<template>
  <panel-template title="Partner Client Details">
    <template v-slot:content>
      <transition-table-state>
        <div v-if="tableData.partner_client">
          <table class="table table-white">
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
                  <router-link class="text-link" :to="{ name: 'Client', params: { slug: tableData.partner_client.slug } }">
                    {{ tableData.partner_client.name }}
                  </router-link>
                </td>
                <td class="td">{{ tableData.partner_client.id }}</td>
              </tr>
              <tr class="tr">
                <td class="td font-bold">Partner</td>
                <td class="td">
                  <router-link class="text-link" :to="{ name: 'PartnerContract', params: { id: tableData.partner_contract.id, client: tableData.partner_client.slug } }">
                    {{ tableData.partner_contract.name }}
                  </router-link>
                </td>
                <td class="td">{{ tableData.partner_contract.id }}</td>
              </tr>
              <tr class="tr">
                <td class="td font-bold">Campaign</td>
                <td class="td">
                  <router-link class="text-link" :to="{ name: 'Campaign', params: { id: tableData.campaign.id, partner: tableData.partner_contract.id, client: tableData.partner_client.slug } }">
                    {{ tableData.campaign.name }}
                  </router-link>
                </td>
                <td class="td">{{ tableData.campaign.id }}</td>
              </tr>
            </tbody>
          </table>
          <table class="table table-white mt-3">
            <tbody>
              <tr class="tr">
                <td class="td font-bold w-40 rounded-tl-md">Campaign Code</td>
                <td class="td rounded-tr-md">{{ tableData.campaign.code }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <table-empty-state v-else
                           heading="No Partner Client Data"
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
