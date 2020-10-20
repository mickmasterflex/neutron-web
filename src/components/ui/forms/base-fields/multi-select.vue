<template>
  <div class="field-group">
    <label class="field-label" v-if="$attrs.field_label" :for="$attrs.field_id">{{$attrs.field_label}}</label>
    <select
      class="appearance-none base-field"
      :class="$attrs.field_class"
      v-model="selected"
      @change="updateValue"
      multiple>
      <option
        disabled
        value=""
        v-text="disabledOption"/>
      <option
        v-for="option in options"
        :key="option.id"
        :value="option.id"
        v-text="option.name"/>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    disabledOption: {
      type: String,
      default: 'Select something'
    },
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      selected: this.value
    }
  },
  methods: {
    updateValue () {
      this.$emit('input', this.selected)
    }
  }
}
</script>

<style scoped>
  .base-field {
    @apply h-auto p-0
  }
  option {
    @apply p-2
  }
</style>
