<template>
  <base-panel-grid>
    <lead-data-panel class="col-span-2 xl:col-span-1"></lead-data-panel>
    <partner-panel class="col-span-2 xl:col-span-1" :tableData="partnerDetails"></partner-panel>
    <buyer-panel class="col-span-2 xl:col-span-1" :tableData="buyerDetails"></buyer-panel>
    <product-panel class="col-span-2 xl:col-span-1" :tableData="productDetails"></product-panel>
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
        brand: this.lead.brand_data,
        campus: this.lead.campus_data,
        product: this.lead.product_data
      }
    },
    buyerDetails () {
      return {
        buyer_client: this.lead.buyer_client_data,
        buyer_contract: this.lead.buyer_contract_data,
        offer_contract: this.lead.offer_contract_data
      }
    },
    partnerDetails () {
      return {
        partner_client: this.lead.partner_client_data,
        partner_contract: this.lead.partner_contract_data,
        campaign: this.lead.campaign_data,
        channel: this.lead.channel_data,
        pricing_tier_group: this.lead.pricing_tier_group_data,
        vertical: this.lead.vertical_data
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
