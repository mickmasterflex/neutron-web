<template>
  <div>
    <switch-toggle :fieldId="field_id" :isChecked="checked" size="lg">
      <template v-slot:switch-off><slot name="switch-off"/></template>
      <template v-slot:switch-on><slot name="switch-on"/></template>
    </switch-toggle>
    <input
      @input="handleInput($event.target.checked)"
      type="checkbox"
      :id="field_id"
      :class="$attrs.field_class"
      class="hidden"
      :checked="value"
      v-model="checked">
  </div>
</template>

<script>
import switchToggle from '@/components/ui/forms/base-fields/switch'

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
  data () {
    return {
      checked: this.value
    }
  },
  watch: {
    value () {
      this.checked = this.value
    }
  },
  methods: {
    handleInput (value) {
      this.$emit('input', value)
    }
  },
  components: {
    'switch-toggle': switchToggle
  }
}
</script>
