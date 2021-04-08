<template>
  <panel-template
    title="Contract Fields"
    :actionTransition="true"
    :showLoader="loading"
    :loadingText="loadingText">
    <template v-slot:action>
      <create-field></create-field>
    </template>
    <template v-slot:content>
      <list-fields :clientSlug="clientSlug" :contractName="contractName"></list-fields>
      <component :is="updateComponent" :field="currentField"></component>
    </template>
  </panel-template>
</template>

<script>
import listFields from '@/components/forms/fields/list'
import createField from '@/components/forms/fields/create'
import updateTextField from '@/components/forms/fields/text-fields/update'
import updateOptionField from '@/components/forms/fields/option-fields/update'
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    loading: Boolean,
    loadingText: String,
    contractName: String, // fixme: passing this prop many components deep
    clientSlug: String // fixme: passing this prop many components deep
  },
  data () {
    return {
      currentFieldId: {
        type: Number
      },
      updateComponent: null
    }
  },
  components: {
    updateTextField,
    updateOptionField,
    'list-fields': listFields,
    'create-field': createField
  },
  computed: {
    ...mapGetters({
      currentField: 'getCurrentField'
    })
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
  },
  methods: {
    ...mapMutations({
      showUpdateTextFieldModal: 'SHOW_UPDATE_TEXT_FIELD_MODAL',
      showUpdateOptionFieldModal: 'SHOW_UPDATE_OPTION_FIELD_MODAL'
    }),
    async setUpdateComponent (component) {
      this.updateComponent = component
    }
  }
}
</script>
