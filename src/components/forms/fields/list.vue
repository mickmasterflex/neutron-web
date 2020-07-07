<template>
  <div class="well well-light">
    <div v-if="form.fields">
      <div class="fields-inline-heading bg-gray-900 rounded flex flex-row items-center mb-2">
        <span class="w-24 th fields-inline-heading-item">Order</span>
        <span class="w-20 th fields-inline-heading-item">ID</span>
        <span class="w-64 th fields-inline-heading-item">Label</span>
        <span class="w-64 th fields-inline-heading-item">Mapping</span>
        <span class="w-20 th fields-inline-heading-item">Deliver</span>
      </div>
      <ul-draggable v-bind="dragOptions" v-model="form.fields">
        <li v-for="(field, index) in form.fields" :key="field.id">
          <div :field="field" class="card card-sm mb-1 flex flex-row items-center justify-between">
            <field-list-item :field="field" :newOrder="index + 1"></field-list-item>
            <span class="flex flex-row">
              <delete-field :id="field.id" :type="field.type" v-if="field.type" class="ml-1"></delete-field>
              <fetch-current-field :id="field.id" :type="field.type" icon="pencil-alt" v-if="field.type" class="mr-1"></fetch-current-field>
            </span>
          </div>
        </li>
      </ul-draggable>
    </div>
    <div v-else>
      No Fields
    </div>
    <update-option-field></update-option-field>
    <update-text-field></update-text-field>
  </div>
</template>

<script>
import updateTextField from '@/components/forms/fields/text-fields/update'
import updateOptionField from '@/components/forms/fields/option-fields/update'
import fetchCurrentField from '@/components/forms/fields/fetch-current-field'
import deleteField from '@/components/forms/fields/delete'
import fieldListItem from '@/components/forms/fields/list-item'
import draggable from 'vuedraggable'
import { dragOptions } from '@/mixins/dragOptions'
import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      currentFieldId: {
        default: null,
        type: Number
      }
    }
  },
  components: {
    'delete-field': deleteField,
    'update-text-field': updateTextField,
    'update-option-field': updateOptionField,
    'fetch-current-field': fetchCurrentField,
    'field-list-item': fieldListItem,
    'ul-draggable': draggable
  },
  methods: {
    ...mapMutations({
      showUpdateTextFieldModal: 'SHOW_UPDATE_TEXT_FIELD_MODAL',
      showUpdateOptionFieldModal: 'SHOW_UPDATE_OPTION_FIELD_MODAL'
    })
  },
  mixins: [dragOptions],
  computed: {
    ...mapGetters({
      currentField: 'getCurrentField',
      form: 'getCurrentForm'
    })
  },
  watch: {
    currentField () {
      if (this.currentField) {
        this.currentFieldId = this.currentField.id
        if (this.currentField.type === 'select' || this.currentField.type === 'radio') {
          this.showUpdateOptionFieldModal()
        } else if (this.currentField.type === 'text' || this.currentField.type === 'textarea') {
          this.showUpdateTextFieldModal()
        }
      } else {
        this.currentFieldId = null
      }
    }
  }
}
</script>
