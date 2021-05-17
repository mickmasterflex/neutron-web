<template>
  <div>
    <switch-toggle :field_id="field_id" :is_on="value" :size="$attrs.size" :on_color="$attrs.on_color" :off_color="$attrs.off_color">
      <template v-slot:switch-off><slot name="switch-off"/></template>
      <template v-slot:switch-on><slot name="switch-on"/></template>
    </switch-toggle>
    <input
      @input="$emit('input', $event.target.checked)"
      type="checkbox"
      :id="field_id"
      :class="$attrs.field_class"
      class="hidden"
      :disabled="$attrs.disabled"
      :checked="value">
  </div>
</template>

<script>
import switchToggle from '@/components/ui/switch/'

export default {
  props: {
    field_label: {
      type: String
    },
    field_id: {
      type: String,
      required: true
    },
    value: {
      type: [Boolean, String]
    }
  },
  components: {
    'switch-toggle': switchToggle
  }
}
</script>
