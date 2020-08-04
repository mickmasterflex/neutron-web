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
    <table-empty-state v-else heading="No Fields" copy="Use the 'Add Field' button to start cloning base fields for this contract."></table-empty-state>
    <component :is="update_component" :field="current_field"></component>
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
      current_field_id: {
        default: null,
        type: Number
      },
      update_component: null
    }
  },
  components: {
    updateTextField,
    updateOptionField,
    'delete-field': deleteField,
    'fetch-current-field': fetchCurrentField,
    'field-list-item': fieldListItem,
    'ul-draggable': draggable
  },
  methods: {
    ...mapMutations({
      showUpdateTextFieldModal: 'SHOW_UPDATE_TEXT_FIELD_MODAL',
      showUpdateOptionFieldModal: 'SHOW_UPDATE_OPTION_FIELD_MODAL'
    }),
    async setUpdateComponent (component) {
      this.update_component = component
    }
  },
  mixins: [dragOptions],
  computed: {
    ...mapGetters({
      current_field: 'getCurrentField',
      form: 'getCurrentForm'
    })
  },
  watch: {
    current_field () {
      if (this.current_field) {
        this.current_field_id = this.current_field.id
        if (this.current_field.type === 'select' || this.current_field.type === 'radio') {
          this.setUpdateComponent(updateOptionField).then(() => {
            this.showUpdateOptionFieldModal()
          })
        } else if (this.current_field.type === 'text' || this.current_field.type === 'textarea') {
          this.setUpdateComponent(updateTextField).then(() => {
            this.showUpdateTextFieldModal()
          })
        }
      } else {
        this.current_field_id = null
      }
    }
  }
}
</script>
