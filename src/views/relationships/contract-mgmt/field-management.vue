<template>
  <base-panel-grid>
    <panel-template
      title="Contract Fields"
      :actionTransition="true"
      :showLoader="loading"
      :loadingText="loadingText"
      class="col-span-2">
      <template v-slot:action>
        <create-field></create-field>
      </template>
      <template v-slot:content>
        <list-fields :clientSlug="client" :contractName="contractName"></list-fields>
      </template>
    </panel-template>
    <component :is="updateComponent" :field="currentField"></component>
    <panel-template class="col-span-2" title="Injected Fields" :showLoader="loading" loadingText="Loading Injected Fields">
      <template v-slot:action>
        <button class="btn btn-turquoise" @click="showCreateInjectedFieldModal()"><font-awesome-icon icon="plus"></font-awesome-icon> Add Injected Field</button>
      </template>
      <template v-slot:content>
        <list-injected-fields></list-injected-fields>
      </template>
    </panel-template>
    <update-injected-field></update-injected-field>
    <create-injected-field></create-injected-field>
  </base-panel-grid>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import listFields from '@/components/forms/fields/list'
import createField from '@/components/forms/fields/create'
import createInjectedField from '@/components/forms/injected-fields/fields/create'
import updateTextField from '@/components/forms/fields/text-fields/update'
import updateOptionField from '@/components/forms/fields/option-fields/update'
import listInjectedFields from '@/components/forms/injected-fields/fields/list'
import updateInjectedField from '@/components/forms/injected-fields/fields/update'

export default {
  props: {
    client: String,
    id: Number
  },
  data () {
    return {
      currentFieldId: {
        type: Number
      },
      updateComponent: null
    }
  },
  computed: {
    ...mapGetters({
      currentField: 'getCurrentField',
      fetchFormsLoading: 'getFetchFormsLoading',
      fetchFormsLoadingText: 'getFetchFormsLoadingText',
      offerFetchLoading: 'getOfferFetchLoading',
      offerFetchLoadingText: 'getOfferFetchLoadingText',
      buyerFetchLoading: 'getBuyerFetchLoading',
      buyerFetchLoadingText: 'getBuyerFetchLoadingText',
      getCurrentOffer: 'getCurrentOffer',
      getCurrentBuyer: 'getCurrentBuyer',
      injectedFieldTypes: 'getInjectedFieldTypes'
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
      showUpdateTextFieldModal: 'SHOW_UPDATE_TEXT_FIELD_MODAL',
      showUpdateOptionFieldModal: 'SHOW_UPDATE_OPTION_FIELD_MODAL',
      resetAncestorForms: 'RESET_ANCESTOR_FORMS',
      showCreateInjectedFieldModal: 'SHOW_CREATE_INJECTED_FIELD_MODAL'
    }),
    ...mapActions({
      fetchForms: 'fetchForms',
      fetchInjectedFieldTypes: 'fetchInjectedFieldTypes'
    }),
    async setUpdateComponent (component) {
      this.updateComponent = component
    }
  },
  components: {
    updateTextField,
    updateOptionField,
    'list-fields': listFields,
    'create-field': createField,
    'create-injected-field': createInjectedField,
    'list-injected-fields': listInjectedFields,
    'update-injected-field': updateInjectedField
  },
  watch: {
    currentField () {
      if (this.currentField) {
        this.currentFieldId = this.currentField.id
        if (this.currentField.type === 'select' || this.currentField.type === 'radio') {
          this.setUpdateComponent(updateOptionField).then(() => {
            this.showUpdateOptionFieldModal()
          })
        } else if (this.currentField.type === 'text' || this.currentField.type === 'textarea') {
          this.setUpdateComponent(updateTextField).then(() => {
            this.showUpdateTextFieldModal()
          })
        }
      } else {
        this.currentFieldId = null
      }
    },
    id () { // id prop changes when navigating from a buyer to an ancestor buyer
      this.resetAncestorForms()
      this.fetchForms()
    }
  },
  created () {
    this.resetAncestorForms()
    this.fetchForms()
    this.fetchInjectedFieldTypes()
  }
}
</script>
