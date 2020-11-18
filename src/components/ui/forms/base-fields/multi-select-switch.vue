<template>
  <div class="field-group">
    <label class="field-label field-label-top" v-if="$attrs.field_label" :for="$attrs.field_id">{{$attrs.field_label}}</label>
    <div class="flex flex-col">
      <div v-for="option in options" :key="option.id" class="flex flex-row items-center mb-2">
        <switch-toggle size="sm" :field_id="fieldId(option)" :is_on="selectedOption(option.id)" :on_color="on_color" :off_color="off_color">
          <template v-slot:switch-off><slot name="switch-off"/></template>
          <template v-slot:switch-on><slot name="switch-on"/></template>
        </switch-toggle>
        <label class="pl-2 cursor-pointer">
          <input
            :id="fieldId(option)"
            class="hidden"
            :value="option.id"
            v-model="selected"
            :checked="selectedOption(option.id)"
            type="checkbox"
            @change="updateValue">
          {{ option.name }}
        </label>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import multiSelectMixin from '@/mixins/fields/multi-select'
import switchToggle from '@/components/ui/switch/'

export default {
  props: {
    on_color: {
      default: 'green'
    },
    off_color: {
      default: 'red'
    }
  },
  mixins: [multiSelectMixin],
  methods: {
    fieldId (option) {
      return option.name + option.id
    }
  },
  components: {
    'switch-toggle': switchToggle
  }
}
</script>
