<template>
  <div>
    <table v-if="contracts.length" class="table table-white">
      <thead>
        <tr>
          <th class="th w-64">Name</th>
          <th class="th w-32">Status</th>
          <th class="th w-16">Id</th>
          <th class="th">Client</th>
          <th class="th">Pricing Tier Group</th>
          <th class="th">Children</th>
        </tr>
      </thead>
      <tbody class="tbody">
        <tr class="tr w-64" v-for="contract in contracts" :key="contract.id">
          <td class="td">
            <router-link :to="{name: 'PartnerContract', params: {client:client, id:contract.id}}" class="text-link">{{contract.name}}</router-link>
          </td>
          <td class="td w-32">
            <status-indicator :red="contract.status === 'terminated'"
                              :green="contract.status === 'active'"
                              :yellow="contract.status === 'paused'">
              {{ contract.status }}
            </status-indicator>
          </td>
          <td class="td w-16">{{ contract.id }}</td>
          <td class="td">{{ contract.client }}</td>
          <td class="td">{{ contract.pricing_tier_group }}</td>
          <td class="td">
            <table-link @table-link-click="linkToPartnerContracts(contract)">{{ contract.children.length }} </table-link>
          </td>
        </tr>
      </tbody>
    </table>
    <table-empty-state v-else heading="No Partner Contracts" copy="Use the 'New Partner' button to add children to this contract."></table-empty-state>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    contracts: Array,
    client: String,
    children: String
  },
  methods: {
    ...mapMutations({
      setCurrentPartner: 'SET_CURRENT_PARTNER'
    }),
    linkToPartnerContracts (contract) {
      this.setCurrentPartner(contract)
      this.$router.push({ name: 'PartnerContractChildren', params: { client: this.client, id: contract.id } })
    }
  }
}
</script>
