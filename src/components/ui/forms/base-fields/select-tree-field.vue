<template>
  <div class="field-group">
    <label class="field-label" v-if="$attrs.field_label" :for="$attrs.field_id">{{$attrs.field_label}}</label>
    <div :class="$attrs.field_wrap_class">
      <div class="relative w-64">
        <tree-select
          :value="value"
          v-bind="$attrs"
          :id="$attrs.field_id"
          @input="handleInput($event)"
        />
      </div>
      <slot/>
    </div>
  </div>
</template>

<script>
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import treeselect from '@riophae/vue-treeselect'

export default {
  props: {
    value: {
      type: null,
      default: null
    }
  },
  methods: {
    handleInput (value) {
      this.$emit('input', value)
    }
  },
  components: {
    'tree-select': treeselect
  }
}
</script>
