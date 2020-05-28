<template>
  <ul-draggable tag="ul" handle=".draggable-handle" class="well" v-if="options.length">
    <li class="p-2 flex flex-row items-center">
      <span>Order - Label - Value - Delete</span>
    </li>
    <li v-for="option in options" :key="option.id" class="card card-sm mb-1 flex flex-row items-center justify-between">
      <update-option :option="option"></update-option>
      <delete-option :option="option" class="mx-1"></delete-option>
    </li>
  </ul-draggable>
</template>

<script>
import draggable from 'vuedraggable'
import { mapGetters } from 'vuex'
import updateOption from '@/components/forms/base-fields/option-fields/options/update'
import deleteOption from '@/components/forms/base-fields/option-fields/options/delete'

export default {
  computed: {
    ...mapGetters({
      options: 'getCurrentBaseOptions'
    })
  },
  components: {
    'update-option': updateOption,
    'delete-option': deleteOption,
    'ul-draggable': draggable
  }
}
</script>
