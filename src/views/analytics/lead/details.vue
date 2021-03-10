<template>
  <base-panel-grid>
    <lead-data-panel class="col-span-2 xl:col-span-1"></lead-data-panel>
    <product-panel class="col-span-2 xl:col-span-1" :tableData="productDetails"></product-panel>
    <buyer-panel class="col-span-2 xl:col-span-1" :tableData="buyerDetails"></buyer-panel>
    <partner-panel class="col-span-2 xl:col-span-1" :tableData="partnerDetails"></partner-panel>
  </base-panel-grid>
</template>

<script>
import leadDataPanel from '@/components/analytics/leads/detail-panels/lead-data'
import productPanel from '@/components/analytics/leads/detail-panels/product-details'
import buyerPanel from '@/components/analytics/leads/detail-panels/buyer-details'
import partnerPanel from '@/components/analytics/leads/detail-panels/partner-details'
import { mapGetters } from 'vuex'

export default {
  props: {
    id: Number
  },
  computed: {
    ...mapGetters({
      lead: 'getCurrentLead'
    }),
    productDetails () {
      return {
        brand: this.lead.brand,
        campus: this.lead.campus
      }
    },
    buyerDetails () {
      return {
        buyer_client: this.lead.buyer_client,
        buyer_contract: this.lead.buyer_contract,
        offer_contract: this.lead.offer_contract
      }
    },
    partnerDetails () {
      return {
        partner_client: this.lead.partner_client,
        partner_contract: this.lead.partner_contract,
        campaign: this.lead.campaign
      }
    }
  },
  components: {
    'lead-data-panel': leadDataPanel,
    'buyer-panel': buyerPanel,
    'partner-panel': partnerPanel,
    'product-panel': productPanel
  }
}
</script>
