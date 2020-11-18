<template>
  <label :for="field_id">
    <switch-toggle :field_id="field_id" :is_on="checked" size="lg" :on_color="on_color" :off_color="off_color">
      <template v-slot:switch-off><slot name="switch-off"/></template>
      <template v-slot:switch-on><slot name="switch-on"/></template>
    </switch-toggle>
    <input
      @input="$emit('input', $event.target.checked)"
      type="checkbox"
      :id="field_id"
      :class="$attrs.field_class"
      class="hidden"
      :checked="value"
      :value="checked">
  </label>
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
    },
    on_color: {
      default: 'green'
    },
    off_color: {
      default: 'red'
    }
  },
  computed: {
    checked () {
      return this.value
    }
  },
  components: {
    'switch-toggle': switchToggle
  }
}
</script>
