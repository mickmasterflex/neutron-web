<template>
  <base-panel-grid>
    <fields-panel-template
      :loading="loading"
      :loading-text="loadingText"
      :contract-name="contractName"
      class="col-span-2"/>
    <injected-panel-template
      :loading="loading"
      :loading-text="loadingText"
      :contract-name="contractName"
      class="col-span-2"/>
    <additional-content-panel-template
      :loading="loading"
      :loading-text="loadingText"
      :contract-name="contractName"
      class="col-span-2"/>
  </base-panel-grid>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import fieldsPanel from '@/components/forms/fields/panel-template'
import injectedFieldsPanel from '@/components/forms/injected-fields/fields/panel-template'
import additionalContentPanel from '@/components/forms/additional-content/panel-template'

export default {
  props: {
    id: Number
  },
  computed: {
    ...mapGetters({
      allForms: 'getAllForms',
      contractAncestorIds: 'getCurrentAncestorsIds',
      fetchFormsLoading: 'getFetchFormsLoading',
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
    formId () {
      return this.contractType === 'offer' ? this.getCurrentOffer.form.id : this.getCurrentBuyer.form.id
    },
    loading () {
      return this.contractLoading ? this.contractLoading : this.fetchFormsLoading
    },
    loadingText () {
      return this.contractLoading ? this.contractLoadingText : 'Loading Inherited Fields'
    }
  },
  methods: {
    ...mapMutations({
      resetAncestorForms: 'RESET_ANCESTOR_FORMS'
    }),
    ...mapActions({
      fetchForms: 'fetchForms',
      fetchUsedBaseFields: 'fetchUsedBaseFields',
      setAncestorForms: 'setAncestorForms'
    }),
    fetchAncestorForms () {
      // If the contract is no longer loading, we can assume that ancestors have been set
      if (this.contractLoading === false) {
        this.resetAncestorForms()
        this.fetchUsedBaseFields(this.formId)
        this.fetchForms()
      }
    }
  },
  watch: {
    contractLoading () {
      this.fetchAncestorForms()
    }
  },
  created () {
    this.fetchAncestorForms()
  },
  components: {
    'fields-panel-template': fieldsPanel,
    'injected-panel-template': injectedFieldsPanel,
    'additional-content-panel-template': additionalContentPanel
  },
  destroyed () {
    this.resetAncestorForms()
  }
}
</script>
