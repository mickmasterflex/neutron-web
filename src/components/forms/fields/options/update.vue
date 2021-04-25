<template>
  <div class="fields-inline" v-if="option">
    <text-field-prefixed
      color="blue"
      icon="arrows-alt-v"
      field_disabled="true"
      field_size="field-sm"
      field_wrap_class="field-draggable"
      v-model="order"
      :field_id="`optionOrder_${option.id}`"
     />
    <v-text-field
      v-model="label"
      :field_id="`optionLabel_${option.id}`"
      rules="required"/>
    <text-field
      v-model="mapping"
      :field_id="`optionMapping_${option.id}`"
     />
    <check-switch v-model="scrub"
                  size="sm"
                  class="w-16 pt-1 field-group"
                  :field_id="`optionScrub_${option.id}`"></check-switch>
    <check-switch v-model="hide"
                  size="sm"
                  class="w-16 pt-1 field-group"
                  :field_id="`optionHide_${option.id}`"></check-switch>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import textFieldPrefixed from '@/components/ui/forms/base-fields/text-field-prefixed'

export default {
  data () {
    return {
      order: this.option.order,
      label: this.option.label,
      mapping: this.option.mapping,
      scrub: this.option.scrub,
      hide: this.option.hide
    }
  },
  props: {
    option: Object,
    newOrder: Number
  },
  computed: {
    optionData () {
      return [this.order, this.label, this.mapping, this.scrub, this.hide]
    }
  },
  watch: {
    optionData () {
      this.addToModified()
      this.updateOptionOrder({ id: this.option.id, order: this.order })
    },
    newOrder () {
      this.order = this.newOrder
    }
  },
  methods: {
    ...mapMutations({
      addOptionToModified: 'ADD_OPTION_TO_MODIFIED',
      updateOptionOrder: 'UPDATE_OPTION_ORDER',
      setUnsavedOptionChanges: 'SET_UNSAVED_OPTION_CHANGES'
    }),
    addToModified () {
      this.setUnsavedOptionChanges()
      this.addOptionToModified({
        order: this.order,
        label: this.label,
        mapping: this.mapping,
        scrub: this.scrub,
        hide: this.hide,
        id: this.option.id,
        field: this.option.field,
        base_option: this.option.base_option
      })
    }
  },
  components: {
    'text-field-prefixed': textFieldPrefixed
  }
}
</script>
