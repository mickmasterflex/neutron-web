<template>
  <ul-draggable tag="ul" handle=".field-draggable" v-model="options" class="well" v-if="options">
    <li v-for="(option, index) in options" :key="option.id" class="card card-sm mb-1 flex flex-row items-center justify-between">
      <update-option :option="option" :newOrder="index + 1"></update-option>
      <delete-option :option="option" class="mx-1"></delete-option>
    </li>
  </ul-draggable>
</template>

<script>
import draggable from 'vuedraggable'
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
  components: {
    'update-option': updateOption,
    'delete-option': deleteOption,
    'ul-draggable': draggable
  }
}
</script>
