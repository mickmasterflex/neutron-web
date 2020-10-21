<template>
  <div class="field-group">
    <label class="field-label field-label-top" v-if="$attrs.field_label" :for="$attrs.field_id">{{$attrs.field_label}}</label>
    <div>
      <div class="well w-64">
        <div
          v-for="option in options"
          :key="option.id">
          <label>
            <input
              :value="option.id"
              v-model="selected"
              :checked="selectedOption(option.id)"
              type="checkbox"
              @change="updateValue">
            {{ option.name }}
          </label>
        </div>
      </div>
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
