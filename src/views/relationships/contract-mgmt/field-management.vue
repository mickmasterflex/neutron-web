<template>
  <div>
    <panel-template title="Contract Fields" :actionTransition="true" :showLoader="loading" loadingText="Loading Contract Fields">
      <template v-slot:action>
        <create-field></create-field>
      </template>
      <template v-slot:content>
        <list-fields></list-fields>
      </template>
    </panel-template>
    <component :is="updateComponent" :field="currentField"></component>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import listFields from '@/components/forms/fields/list'
import createField from '@/components/forms/fields/create'
import updateTextField from '@/components/forms/fields/text-fields/update'
import updateOptionField from '@/components/forms/fields/option-fields/update'

export default {
  props: {
    client: String
  },
  data () {
    return {
      currentFieldId: {
        default: null,
        type: Number
      },
      updateComponent: null
    }
  },
  computed: {
    ...mapGetters({
      currentField: 'getCurrentField',
      offerFetchLoading: 'getOfferFetchLoading',
      buyerFetchLoading: 'getBuyerFetchLoading'
    }),
    loading () {
      if (this.$route.name === 'OfferFieldManagement') {
        return this.offerFetchLoading
      }
      return this.buyerFetchLoading
    }
  },
  methods: {
    ...mapMutations({
      showUpdateTextFieldModal: 'SHOW_UPDATE_TEXT_FIELD_MODAL',
      showUpdateOptionFieldModal: 'SHOW_UPDATE_OPTION_FIELD_MODAL'
    }),
    async setUpdateComponent (component) {
      this.updateComponent = component
    }
  },
  components: {
    updateTextField,
    updateOptionField,
    'list-fields': listFields,
    'create-field': createField
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
    }
  }
}
</script>
