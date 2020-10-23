<template>
  <div class="field-group">
    <label class="field-label field-label-top" v-if="$attrs.field_label" :for="$attrs.field_id">{{$attrs.field_label}}</label>
    <div class="flex flex-col">
      <div v-for="option in options" :key="option.id" class="flex flex-row items-center mb-2">
        <switch-toggle :for="option.name + option.id" :isChecked="selectedOption(option.id)">
          <template v-slot:switch-off><slot name="switch-off"/></template>
          <template v-slot:switch-on><slot name="switch-on"/></template>
        </switch-toggle>
        <label class="ml-1">
          <input
            :id="option.name + option.id"
            class="hidden"
            :value="option.id"
            v-model="selected"
            :checked="selectedOption(option.id)"
            type="checkbox"
            @change="updateValue">
          {{ option.name }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import multiSelectMixin from '@/mixins/fields/multi-select'
import switchToggle from '@/components/ui/forms/functional/switch'

export default {
  mixins: [multiSelectMixin],
  components: {
    'switch-toggle': switchToggle
  }
}
</script>
