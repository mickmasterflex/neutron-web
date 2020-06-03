<template>
  <div class="well well-light">
    <ul class="fields-inline-heading px-1">
      <li class="w-24 fields-inline-heading-item">Order</li>
      <li class="w-64 fields-inline-heading-item">Label</li>
      <li class="w-64 fields-inline-heading-item">Mapping</li>
      <li class="w-12 fields-inline-heading-item">Scrub</li>
      <li class="w-12 fields-inline-heading-item">Hide</li>
    </ul>
    <ul-draggable v-if="options.length" v-bind="dragOptions" v-model="options">
      <li v-for="(option, index) in options" :key="option.id" class="card card-sm mb-1 flex flex-row items-center justify-between">
        <update-option :option="option" :newOrder="index + 1"/>
        <delete-option :id="option.id" class="mx-1"></delete-option>
      </li>
    </ul-draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import updateOption from '@/components/forms/fields/option-fields/options/update'

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
        return this.$store.getters.getCurrentOptions
      },
      set (updatedOptions) {
        this.$store.commit('SET_CURRENT_OPTIONS', updatedOptions)
      }
    }
  },
  components: {
<<<<<<< Updated upstream
    'update-option': updateOption
=======
    'update-option': updateOption,
    'delete-option': deleteOption,
    'ul-draggable': draggable
>>>>>>> Stashed changes
  }
}
</script>
