<template>
  <transition-table-state>
    <div v-if="formFieldsExist">
      <div class="fields-inline-heading bg-gray-900 rounded-lg flex flex-row items-center mb-2">
        <span class="w-20 th rounded-l-lg fields-inline-heading-item">Order</span>
        <span class="w-20 th fields-inline-heading-item">ID</span>
        <span class="w-64 th fields-inline-heading-item">Label</span>
        <span class="w-64 th fields-inline-heading-item">Mapping</span>
        <span class="w-28 th rounded-r-lg fields-inline-heading-item">Pass to Client</span>
      </div>
      <ul-draggable v-bind="dragOptions" v-model="form.fields">
        <li v-for="(field, index) in form.fields" :key="field.id">
          <div :field="field" class="card card-sm mb-1 flex flex-row items-center justify-between">
            <field-list-item :field="field" :newOrder="index + 1"></field-list-item>
            <btn-group-right class="mx-1">
              <delete-field :id="field.id" :type="field.type" v-if="field.type"></delete-field>
              <set-current-field :field="field" :id="field.id" :type="field.type" icon="pencil-alt" v-if="field.type"></set-current-field>
            </btn-group-right>
          </div>
        </li>
      </ul-draggable>
    </div>
    <table-empty-state v-else heading="No Fields" copy="Use the 'Add Field' button to start cloning base fields for this contract."></table-empty-state>
  </transition-table-state>
</template>

<script>
import setCurrentField from '@/components/forms/fields/set-current-field'
import deleteField from '@/components/forms/fields/delete'
import fieldListItem from '@/components/forms/fields/list-item'
import draggable from 'vuedraggable'
import { dragOptions } from '@/mixins/drag-options'
import { mapGetters } from 'vuex'

export default {
  props: {
    clientSlug: String
  },
  components: {
    'delete-field': deleteField,
    'set-current-field': setCurrentField,
    'field-list-item': fieldListItem,
    'ul-draggable': draggable
  },
  mixins: [dragOptions],
  computed: {
    ...mapGetters({
      form: 'getCurrentForm'
    }),
    formFieldsExist () {
      if (this.form.fields) {
        return this.form.fields.length
      } else {
        return 0
      }
    }
  }
}
</script>
