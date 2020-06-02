<template>
  <div class="well well-light">
    <ul class="fields-inline-heading px-1">
      <li class="w-20 fields-inline-heading-item">Order</li>
      <li class="w-64 fields-inline-heading-item">Label</li>
      <li class="w-64 fields-inline-heading-item">Mapping</li>
      <li class="w-64 fields-inline-heading-item">Scrub</li>
      <li class="w-64 fields-inline-heading-item">Hide</li>
    </ul>
    <ul>
      <li v-for="option in options" :key="option.id" class="card card-sm mb-1 flex flex-row items-center justify-between">
        <update-option :option="option"/>
        <delete-option :id="option.id" class="mx-1"></delete-option>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import updateOption from '@/components/forms/fields/option-fields/options/update'
import deleteOption from '@/components/forms/fields/option-fields/options/delete'

export default {
  computed: {
    ...mapGetters({
      options: 'getCurrentOptions'
    })
  },
  components: {
    'update-option': updateOption,
    'delete-option': deleteOption
  }
}
</script>
