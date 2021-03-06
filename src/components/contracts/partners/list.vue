<template>
  <transition-table-state>
    <table v-if="contracts.length" class="table table-striped">
      <thead>
        <tr>
          <th class="th w-4"></th>
          <th class="th w-16">Id</th>
          <th class="th w-64">Name</th>
          <th class="th w-32">Status</th>
          <th class="th">Pricing Tier Group</th>
          <th class="th">Caps</th>
          <th class="th">Contracts</th>
          <th class="th">Campaigns</th>
        </tr>
      </thead>
      <tbody class="tbody">
        <tr class="tr w-64" v-for="(contract, index) in contracts" :key="contract.id">
          <td class="td w-4">
            <bulk-update-checkbox :contract="contract.id" :contracts="contracts" :index="index"></bulk-update-checkbox>
          </td>
          <td class="td w-16">{{ contract.id }}</td>
          <td class="td">
            <span @click="linkToPartner(contract)" class="text-link">{{contract.name}}</span>
          </td>
          <td-status :status="contract.status"/>
          <td class="td">
            <span v-if="contract.pricing_tier_group">{{ contract.pricing_tier_group }}
            </span>
            <span v-else class="italic text-gray-500">None</span>
          </td>
          <td-caps-preview :caps="contract.caps" :parent-id="contract.id" parent-type="partners"/>
          <td class="td">
            <table-link @table-link-click="linkToPartnerContracts(contract)"
                        :number="contract.children.length"
            ></table-link>
          </td>
          <td class="td">
            <table-link @table-link-click="linkToPartnerContractCampaigns(contract)"
                        :number="contract.campaigns.length"
            ></table-link>
          </td>
        </tr>
      </tbody>
    </table>
    <table-empty-state v-else
                       :heading="emptyStateHeading"
                       :copy="emptyStateCopy"
                       class="well"></table-empty-state>
  </transition-table-state>
</template>

<script>
import { mapMutations } from 'vuex'
import bulkUpdateCheckbox from '@/components/bulk-update/status/partner-checkbox'
import tdCapsPreview from '@/components/caps/td-preview/td'
import tdContractStatus from '@/components/contracts/td-status'

export default {
  props: {
    contracts: Array,
    client: String,
    children: String,
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
      setCurrentPartner: 'SET_CURRENT_PARTNER',
      setCurrentAltIds: 'SET_CURRENT_ALTERNATE_IDS',
      setCurrentClientData: 'SET_CURRENT_CLIENT_DATA',
      setCurrentPartnerAncestors: 'SET_CURRENT_ANCESTORS',
      resetShiftClickIndex: 'RESET_BULK_UPDATE_PARTNERS_SHIFT_CLICK_INDEX'
    }),
    setCurrentPartnerWithAncestors (contract) {
      this.setCurrentPartner(contract)
      this.setCurrentAltIds(contract.alternate_ids)
      this.setCurrentClientData(contract.client_data)
      this.setCurrentPartnerAncestors(contract.ancestors)
    },
    linkToPartnerContracts (contract) {
      this.setCurrentPartnerWithAncestors(contract)
      this.$router.push({ name: 'PartnerContractContracts', params: { client: this.client, id: contract.id } })
    },
    linkToPartner (contract) {
      this.setCurrentPartnerWithAncestors(contract)
      this.$router.push({ name: 'PartnerContract', params: { client: this.client, id: contract.id } })
    },
    linkToPartnerContractCampaigns (contract) {
      this.setCurrentPartnerWithAncestors(contract)
      this.$router.push({ name: 'PartnerContractCampaigns', params: { client: this.client, id: contract.id } })
    }
  },
  components: {
    'bulk-update-checkbox': bulkUpdateCheckbox,
    'td-caps-preview': tdCapsPreview,
    'td-status': tdContractStatus
  },
  destroyed () {
    this.resetShiftClickIndex()
  }
}
</script>
