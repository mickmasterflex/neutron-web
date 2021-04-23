<template>
  <div class="well">
    <ul class="fields-inline-heading px-1" v-if="options.length">
      <li class="w-20 fields-inline-heading-item">Order</li>
      <li class="w-64 fields-inline-heading-item">Label</li>
      <li class="w-64 fields-inline-heading-item">Mapping</li>
      <li class="w-16 fields-inline-heading-item">Scrub</li>
      <li class="w-16 fields-inline-heading-item">Hide</li>
    </ul>
    <ul-draggable v-if="options.length" v-bind="dragOptions" v-model="options">
      <li v-for="(option, index) in options" :key="option.id" class="card card-sm mb-1 flex flex-row items-center justify-between">
        <update-option :option="option" :newOrder="index + 1"/>
        <delete-option :option="option" class="mx-1"></delete-option>
      </li>
    </ul-draggable>
    <table-empty-state v-else heading="No Options" copy="Add some from the available options below."></table-empty-state>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { dragOptions } from '@/mixins/drag-options'
import updateOption from '@/components/forms/fields/options/update'
import deleteOption from '@/components/forms/fields/options/delete'

export default {
  computed: {
    options: {
      get () {
        return this.$store.getters.getCurrentOptions
      },
      set (updatedOptions) {
        this.$store.commit('SET_CURRENT_OPTIONS', updatedOptions)
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
