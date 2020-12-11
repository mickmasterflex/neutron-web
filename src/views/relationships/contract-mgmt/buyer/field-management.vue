<template>
  <div>
    <action-heading>
      <template v-slot:left>
        <h2 class="h3">Contract Fields</h2>
      </template>
      <template v-slot:right>
        <create-field></create-field>
      </template>
    </action-heading>
    <list-fields></list-fields>
    <component :is="updateComponent" :field="currentField"></component>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import listFields from '@/components/forms/fields/list'
import createField from '@/components/forms/fields/create'
import updateTextField from '@/components/forms/fields/text-fields/update'
import updateOptionField from '@/components/forms/fields/option-fields/update'

export default {
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
      buyer: 'getCurrentBuyer'
    })
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
