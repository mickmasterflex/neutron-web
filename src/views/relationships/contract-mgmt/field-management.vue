<template>
  <base-panel-grid>
    <fields-panel-template
      :loading="loading"
      :loading-text="loadingText"
      :contract-name="contractName"
      :client-slug="client"
      class="col-span-2"/>
    <injected-panel-template
      :loading="loading"
      :loading-text="loadingText"
      class="col-span-2"/>
  </base-panel-grid>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import fieldsPanel from '@/components/forms/fields/panel-template'
import injectedFieldsPanel from '@/components/forms/injected-fields/fields/panel-template'

export default {
  props: {
    client: String,
    id: Number
  },
  computed: {
    ...mapGetters({
      fetchFormsLoading: 'getFetchFormsLoading',
      fetchFormsLoadingText: 'getFetchFormsLoadingText',
      offerFetchLoading: 'getOfferFetchLoading',
      offerFetchLoadingText: 'getOfferFetchLoadingText',
      buyerFetchLoading: 'getBuyerFetchLoading',
      buyerFetchLoadingText: 'getBuyerFetchLoadingText',
      getCurrentOffer: 'getCurrentOffer',
      getCurrentBuyer: 'getCurrentBuyer'
    }),
    contractType () {
      return this.$route.name === 'OfferFieldManagement' ? 'offer' : 'buyer'
    },
    contractName () {
      return this.contractType === 'offer' ? this.getCurrentOffer.name : this.getCurrentBuyer.name
    },
    contractLoading () {
      if (this.contractType === 'offer') {
        return this.offerFetchLoading
      }
      return this.buyerFetchLoading
    },
    contractLoadingText () {
      if (this.contractType === 'offer') {
        return this.offerFetchLoadingText
      }
      return this.buyerFetchLoadingText
    },
    loading () {
      return this.contractLoading ? this.contractLoading : this.fetchFormsLoading
    },
    loadingText () {
      return this.contractLoading ? this.contractLoadingText : this.fetchFormsLoadingText
    }
  },
  methods: {
    ...mapMutations({
      resetAncestorForms: 'RESET_ANCESTOR_FORMS'
    }),
    ...mapActions({
      fetchForms: 'fetchForms'
    })
  },
  watch: {
    id () { // id prop changes when navigating from a buyer to an ancestor buyer
      this.resetAncestorForms()
      this.fetchForms()
    }
  },
  created () {
    this.resetAncestorForms()
    this.fetchForms()
  },
  components: {
    'fields-panel-template': fieldsPanel,
    'injected-panel-template': injectedFieldsPanel
  }
}
</script>
