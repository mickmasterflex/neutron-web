<template>
  <div class="flex flex-row items-center" v-if="option">
    <v-text-field
      v-model="order"
      :field_id="`optionOrder_${option.id}`"
      rules="required|integer"
      class="field-group field-sm mr-2"/>
    <v-text-field
      v-model="label"
      :field_id="`optionLabel_${option.id}`"
      rules="required"
      class="field-group mr-2"/>
    <text-field
      v-model="mapping"
      :field_id="`optionMapping_${option.id}`"
      class="field-group"/>
    <checkbox-single
      v-model="scrub"
      :field_id="`optionScrub_${option.id}`"
      field_label="Scrub"
      class="field-group"/>
    <checkbox-single
      v-model="hide"
      :field_id="`optionHide_${option.id}`"
      field_label="Hide"
      class="field-group"/>
    <delete-option :id="option.id"></delete-option>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import deleteOption from '@/components/forms/fields/option-fields/options/delete'

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
    option: Object
  },
  computed: {
    optionData () {
      return [this.order, this.label, this.mapping, this.scrub, this.hide]
    }
  },
  watch: {
    optionData () {
      this.addToModified()
    }
  },
  methods: {
    ...mapMutations({ addOptionToModified: 'ADD_OPTION_TO_MODIFIED' }),
    addToModified () {
      this.addOptionToModified({
        order: this.order,
        label: this.label,
        mapping: this.mapping,
        scrub: this.scrub,
        hide: this.hide,
        field: this.option.field,
        id: this.option.id,
        base_option: this.option.base_option
      })
    }
  },
  components: {
    'delete-option': deleteOption
  }
}
</script>
