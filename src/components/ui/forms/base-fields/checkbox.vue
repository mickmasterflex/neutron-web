<template>
  <label :for="field_id">
<!--    <font-awesome-icon icon="check-square" v-if="$refs.checkbox.prop.intermediate"></font-awesome-icon>-->
<!--    <font-awesome-icon icon="check-square" v-else-if="checked"></font-awesome-icon>-->
<!--    <font-awesome-icon icon="square" v-else></font-awesome-icon>-->
    <input
      ref="checkbox"
      @input="handleInput($event.target.checked)"
      type="checkbox"
      :id="field_id"
      :class="$attrs.field_class"
      :checked="value"
      :indeterminate.prop="indeterminate"
      v-model="checked">
    {{field_label}}
  </label>
</template>

<script>
export default {
  props: {
    field_label: {
      type: String
    },
    field_id: {
      type: [String, Number],
      required: true
    },
    value: {
      type: [Boolean, String]
    },
    indeterminate: {
      type: Boolean
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
  }
}
</script>
