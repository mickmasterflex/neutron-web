<template>
  <div class="field-group">
    <label class="field-label field-label-top" v-if="$attrs.field_label" :for="$attrs.field_id">{{$attrs.field_label}}</label>
    <div>
      <select
        class="appearance-none base-field"
        :class="$attrs.field_class"
        :id="$attrs.field_id"
        v-model="selected"
        @change="updateValue"
        multiple>
        <option
          disabled
          value=""
          v-text="disabledOption"/>
        <option
          v-for="option in options"
          :selected="selectedOption(option.id)"
          :key="option.id"
          :value="option.id">{{option.name}}</option>
      </select>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import multiSelectMixin from '@/mixins/fields/multi-select'

export default {
  mixins: [multiSelectMixin]
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
