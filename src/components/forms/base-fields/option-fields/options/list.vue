<template>
  <div class="well">
    <ul class="fields-inline-heading px-1">
      <li class="w-24 fields-inline-heading-item">Order</li>
      <li class="w-64 fields-inline-heading-item">Label</li>
      <li class="w-64 fields-inline-heading-item">Value</li>
    </ul>
    <ul-draggable v-bind="dragOptions" v-model="options">
      <li v-for="(option, index) in options" :key="option.id" class="card card-sm mb-1 flex flex-row items-center justify-between">
        <update-option :option="option" :newOrder="index + 1"></update-option>
        <delete-option :option="option" class="mx-1"></delete-option>
      </li>
    </ul-draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { dragOptions } from '@/mixins/drag-options'
import updateOption from '@/components/forms/base-fields/option-fields/options/update'
import deleteOption from '@/components/forms/base-fields/option-fields/options/delete'

export default {
  computed: {
    options: {
      get () {
        return this.$store.getters.getCurrentBaseOptions
      },
      set (updatedOptions) {
        this.$store.commit('SET_CURRENT_BASE_OPTIONS', updatedOptions)
      }
    }
  },
  mixins: [dragOptions],
  components: {
    'update-option': updateOption,
    'delete-option': deleteOption,
    'ul-draggable': draggable
  }
}
</script>
