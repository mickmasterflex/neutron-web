<template>
  <div class="fields-inline">
    <text-field-prefixed
      color="blue"
      icon="arrows-alt-v"
      field_disabled="true"
      field_size="field-sm"
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
  computed: {
    optionData () {
      return [this.order, this.label, this.value]
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
    newOrder () {
      this.order = this.newOrder
    }
  },
  methods: {
    ...mapMutations({
      addBaseOptionToModified: 'ADD_BASE_OPTION_TO_MODIFIED',
      updateBaseOptionOrder: 'UPDATE_BASE_OPTION_ORDER',
      setUnsavedBaseOptionChanges: 'SET_UNSAVED_BASE_OPTION_CHANGES'
    }),
    addToModified () {
      this.setUnsavedBaseOptionChanges()
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
