<template>
  <div class="fields-inline">
    <text-field-prefixed
      color="blue"
      icon="arrows-alt-v"
      field_disabled="true"
      field_class="field-sm"
      prefix_group_class="field-draggable"
      v-model="order"
      :field_id="`optionOrder_${option.id}`"
     />
    <v-text-field
      v-model="label"
      :field_id="`optionLabel_${option.id}`"
      rules="required"
      class="field-error-inside"/>
    <v-text-field
      v-model="value"
      :field_id="`optionValue_${option.id}`"
      rules="required"
      class="field-error-inside"/>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import textFieldPrefixed from '@/components/ui/forms/base-fields/text-field-prefixed'
import { checkUnsavedChangesInModal } from '@/mixins/checkUnsavedChangesInModal'

export default {
  data () {
    return {
      order: this.option.order,
      label: this.option.label,
      value: this.option.value
    }
  },
  props: {
    option: Object,
    newOrder: Number
  },
  mixins: [checkUnsavedChangesInModal],
  computed: {
    optionData () {
      return [this.order, this.label, this.value]
    },
    unsavedChanges () {
      return this.order !== this.option.order || this.label !== this.option.label || this.value !== this.option.value
    },
    ...mapGetters({
      showUpdateOptionModal: 'getShowUpdateBaseOptionFieldModal'
    })
  },
  watch: {
    optionData () {
      this.addToModified()
      this.updateBaseOptionOrder({ id: this.option.id, order: this.order })
    },
    unsavedChanges () {
      this.checkUnsavedChanges(this.showUpdateOptionModal, this.unsavedChanges)
    },
    newOrder () {
      this.order = this.newOrder
    }
  },
  methods: {
    ...mapMutations({
      addBaseOptionToModified: 'ADD_BASE_OPTION_TO_MODIFIED',
      toggleChangesInModalUnsaved: 'TOGGLE_CHANGES_IN_MODAL_UNSAVED',
      updateBaseOptionOrder: 'UPDATE_BASE_OPTION_ORDER'
    }),
    addToModified () {
      this.addBaseOptionToModified({
        id: this.option.id,
        order: this.order,
        label: this.label,
        value: this.value,
        field: this.option.field
      })
    }
  },
  components: {
    'text-field-prefixed': textFieldPrefixed
  }
}
</script>
