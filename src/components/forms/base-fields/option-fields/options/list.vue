<template>
  <div class="well">
    <ul v-if="options.length" class="fields-inline-heading px-1">
      <li class="w-24 fields-inline-heading-item">Order</li>
      <li class="w-64 fields-inline-heading-item">Label</li>
      <li class="w-64 fields-inline-heading-item">Value</li>
    </ul>
    <ul-draggable v-if="options.length" v-bind="dragOptions" v-model="options">
      <li v-for="(option, index) in options" :key="option.id" class="card card-sm mb-1 flex flex-row items-center justify-between">
        <update-option :option="option" :newOrder="index + 1"></update-option>
        <delete-option :option="option" class="mx-1"></delete-option>
      </li>
    </ul-draggable>
    <create-option :class="[options.length ? 'mt-2' : '']"></create-option>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import updateOption from '@/components/forms/base-fields/option-fields/options/update'
import deleteOption from '@/components/forms/base-fields/option-fields/options/delete'
import createOption from '@/components/forms/base-fields/option-fields/options/create'

export default {
  computed: {
    dragOptions () {
      return {
        animation: 200,
        tag: 'ul',
        handle: '.field-draggable'
      }
    },
    options: {
      get () {
        return this.$store.getters.getCurrentBaseOptions
      },
      set (updatedOptions) {
        this.$store.commit('SET_CURRENT_BASE_OPTIONS', updatedOptions)
      }
    }
  },
  components: {
    'update-option': updateOption,
    'delete-option': deleteOption,
    'create-option': createOption,
    'ul-draggable': draggable
  }
}
</script>
