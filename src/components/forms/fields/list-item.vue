<template>
  <div class="fields-inline">
    <text-field-prefixed
      color="blue"
      icon="arrows-alt-v"
      field_disabled="true"
      field_class="field-sm"
      prefix_group_class="field-draggable"
      v-model="this.order"
      :field_id="`fieldOrder_${this.field.id}`"/>
    <text-field field_class="field-sm" :value="this.field.id" field_disabled="true"/>
    <text-field :value="this.field.label" field_disabled="true"/>
    <text-field :value="this.field.mapping" field_disabled="true"/>
    <text-field field_class="field-sm" :value="this.field.deliver" field_disabled="true"/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import textFieldPrefixed from '@/components/ui/forms/base-fields/text-field-prefixed'

export default {
  props: {
    field: {
      type: Object,
      required: true
    },
    newOrder: Number
  },
  data () {
    return {
      order: this.field.order
    }
  },
  watch: {
    order () {
      this.addToModified()
      this.toggleChangesInModalUnsaved(true)
    },
    newOrder () {
      this.order = this.newOrder
    }
  },
  methods: {
    ...mapMutations({
      addFieldToModified: 'ADD_FIELD_TO_MODIFIED',
      toggleChangesInModalUnsaved: 'TOGGLE_CHANGES_IN_MODAL_UNSAVED'
    }),
    addToModified () {
      this.addFieldToModified({
        order: this.order,
        id: this.field.id,
        label: this.field.label,
        mapping: this.field.mapping,
        deliver: this.field.deliver,
        type: this.field.type,
        form: this.field.form,
        base_field: this.field.base_field
      })
    }
  },
  components: {
    'text-field-prefixed': textFieldPrefixed
  }
}
</script>
