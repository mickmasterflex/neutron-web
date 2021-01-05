<template>
  <transition-table-state>
    <table v-if="contracts.length" class="table table-white">
      <thead>
        <tr>
          <th class="th w-64">Name</th>
          <th class="th w-32">Status</th>
          <th class="th w-16">Id</th>
          <th class="th">Client</th>
        </tr>
      </thead>
      <tbody class="tbody">
        <tr class="tr w-64" v-for="contract in contracts" :key="contract.id">
          <td class="td">
            <span @click="linkToPartner(contract)" class="text-link">{{contract.name}}</span>
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
        </tr>
      </tbody>
    </table>
    <table-empty-state v-else
                       :heading="emptyStateHeading"
                       :copy="emptyStateCopy"></table-empty-state>
  </transition-table-state>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    contracts: Array,
    client: String,
    emptyStateHeading: {
      type: String,
      default: 'No Partner Contracts'
    },
    emptyStateCopy: {
      type: String,
      default: 'Use the \'New Partner\' button to add partners to this client.'
    }
  },
  methods: {
    ...mapMutations({
      setCurrentPartner: 'SET_CURRENT_PARTNER'
    }),
    linkToPartner (contract) {
      this.setCurrentPartner(contract)
      this.$router.push({ name: 'PartnerContract', params: { client: this.client, id: contract.id } })
    }
  }
}
</script>
