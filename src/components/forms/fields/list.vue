<template>
  <div>
    <div v-if="form">
      <div class="bg-gray-900 text-white rounded flex flex-row items-center">
        <span class="py-1 px-3">ID</span>
        <span class="py-1 px-3">Label</span>
        <span class="py-1 px-3">Mapping</span>
        <span class="py-1 px-3">Deliver</span>
      </div>
      <div v-for="field in form.fields" :key="field.id">
        <div :field="field" v-show="field.id!==currentFieldId" class="flex flex-row items-center">
          <text-field :value="field.id" field_disabled="true"/>
          <text-field :value="field.label" field_disabled="true"/>
          <text-field :value="field.mapping" field_disabled="true"/>
          <text-field :value="field.deliver" field_disabled="true"/>
          <span class="flex flex-row">
            <delete-field :id="field.id" :type="field.type" v-if="field.type"></delete-field>
            <fetch-current-field :id="field.id" :type="field.type" copy="e" v-if="field.type"></fetch-current-field>
          </span>
        </div>
        <portal-target :name="`updateOptionField--${field.id}`" v-if="field.type === 'select' || field.type === 'radio'"></portal-target>
        <portal-target :name="`updateTextField--${field.id}`" v-if="field.type === 'text' || field.type === 'textarea'"></portal-target>
      </div>
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
    'fetch-current-field': fetchCurrentField
  },
  methods: {
    ...mapMutations({
      toggleShowUpdateTextField: 'TOGGLE_SHOW_UPDATE_TEXT_FIELD',
      toggleShowUpdateOptionField: 'TOGGLE_SHOW_UPDATE_OPTION_FIELD'
    })
  },
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
