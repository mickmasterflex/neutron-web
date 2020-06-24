<template>
  <div>
    <div v-if="form">
      <div class="fields-inline-heading bg-gray-900 rounded flex flex-row items-center mb-2">
        <span class="w-24 th fields-inline-heading-item">Order</span>
        <span class="w-20 th fields-inline-heading-item">ID</span>
        <span class="w-64 th fields-inline-heading-item">Label</span>
        <span class="w-64 th fields-inline-heading-item">Mapping</span>
        <span class="w-20 th fields-inline-heading-item">Deliver</span>
      </div>
      <ul-draggable v-bind="dragOptions" v-model="form.fields">
        <li v-for="(field, index) in form.fields" :key="field.id">
          <div :field="field" v-show="field.id!==currentFieldId" class="card card-sm mb-1 flex flex-row items-center justify-between">
            <field-list-item :field="field" :newOrder="index + 1"></field-list-item>
            <span class="flex flex-row">
              <delete-field :id="field.id" :type="field.type" v-if="field.type" class="ml-1"></delete-field>
              <fetch-current-field :id="field.id" :type="field.type" icon="pencil-alt" v-if="field.type" class="mr-1"></fetch-current-field>
            </span>
          </div>
          <portal-target :name="`updateOptionField--${field.id}`" v-if="field.type === 'select' || field.type === 'radio'"></portal-target>
          <portal-target :name="`updateTextField--${field.id}`" v-if="field.type === 'text' || field.type === 'textarea'"></portal-target>
        </li>
      </ul-draggable>
    </div>
    <div v-else>
      No Fields
    </div>
    <portal v-if="currentField" :to="`updateOptionField--${currentFieldId}`">
      <update-option-field :field="this.currentField" :form="form.id" v-show="showUpdateOptionField"></update-option-field>
    </portal>
    <portal v-if="currentField" :to="`updateTextField--${currentFieldId}`">
      <update-text-field :field="this.currentField" :form="form.id" v-show="showUpdateTextField"></update-text-field>
    </portal>
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
      toggleShowUpdateTextField: 'TOGGLE_SHOW_UPDATE_TEXT_FIELD',
      toggleShowUpdateOptionField: 'TOGGLE_SHOW_UPDATE_OPTION_FIELD'
    })
  },
  mixins: [dragOptions],
  computed: {
    ...mapGetters({
      currentField: 'getCurrentField',
      form: 'getCurrentForm',
      showUpdateTextField: 'getShowUpdateTextField',
      showUpdateOptionField: 'getShowUpdateOptionField'
    })
  },
  watch: {
    currentField () {
      if (this.currentField) {
        this.currentFieldId = this.currentField.id
        if (this.currentField.type === 'select' || this.currentField.type === 'radio') {
          this.toggleShowUpdateOptionField(true)
          this.toggleShowUpdateTextField(false)
        } else if (this.currentField.type === 'text' || this.currentField.type === 'textarea') {
          this.toggleShowUpdateTextField(true)
          this.toggleShowUpdateOptionField(false)
        }
      } else {
        this.currentFieldId = null
      }
    }
  }
}
</script>
