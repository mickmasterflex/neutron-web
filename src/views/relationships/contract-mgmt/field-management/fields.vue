<template>
  <base-panel-grid>
    <contract-field-panel-template
      :loading="loading"
      :loading-text="loadingText"
      :contract-name="contract.name"
      class="col-span-2"
    ></contract-field-panel-template>
    <injected-panel-template
      :loading="loading"
      :loading-text="loadingText"
      :contract-name="contract.name"
      class="col-span-2"/>
    <additional-content-panel-template
      :loading="loading"
      :loading-text="loadingText"
      :contract-name="contract.name"
      class="col-span-2"/>
  </base-panel-grid>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import contractFieldPanelTemplate from '@/components/forms/fields/contract-field-panel/index'
import injectedFieldsPanel from '@/components/forms/injected-fields/fields/panel-template'
import additionalContentPanel from '@/components/forms/additional-content/panel-template'

export default {
  props: {
    id: Number
  },
  computed: {
    ...mapGetters({
      allForms: 'getAllForms',
      currentForm: 'getCurrentForm',
      contractAncestorIds: 'getCurrentAncestorsIds',
      fetchFormsLoading: 'getFetchFormsLoading',
      offerFetchLoading: 'getOfferFetchLoading',
      offerFetchLoadingText: 'getOfferFetchLoadingText',
      buyerFetchLoading: 'getBuyerFetchLoading',
      buyerFetchLoadingText: 'getBuyerFetchLoadingText',
      getCurrentOffer: 'getCurrentOffer',
      getCurrentBuyer: 'getCurrentBuyer',
      fetchUsedBaseFieldsLoading: 'getFetchUsedBaseFieldsLoading'
    }),
    contractType () {
      return this.$route.name === 'OfferFieldManagement' ? 'offer' : 'buyer'
    },
    contract () {
      return this.contractType === 'offer' ? this.getCurrentOffer : this.getCurrentBuyer
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
        this.fetchUsedBaseFields(this.contract.form.id)
        if (this.contract.parent) {
          this.fetchForms()
        }
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
    'contract-field-panel-template': contractFieldPanelTemplate,
    'injected-panel-template': injectedFieldsPanel,
    'additional-content-panel-template': additionalContentPanel
  },
  destroyed () {
    this.resetAncestorForms()
  }
}
</script>
