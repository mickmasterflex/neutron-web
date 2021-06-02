<template>
  <div class="field-group">
    <label class="field-label" v-if="$attrs.field_label" :for="$attrs.field_id">{{$attrs.field_label}}</label>
    <div :class="$attrs.field_wrap_class">
      <div class="relative w-64">
        <loading-options v-if="$attrs.loading" :class="`${$attrs.field_class} ${field_size}`"></loading-options>
        <tree-select
          v-else
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
import loading from '@/components/ui/forms/base-fields/loading'

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
  computed: {
    field_size () {
      return this.$attrs.field_size ? this.$attrs.field_size : 'field-lg'
    }
  },
  components: {
    'loading-options': loading,
    'tree-select': treeselect
  }
}
</script>

<style>
  .vue-treeselect__control {
    @apply h-10 border-gray-400 rounded shadow
  }
  .vue-treeselect__single-value,
  .vue-treeselect__placeholder {
    padding-top: 2px;
  }
</style>
