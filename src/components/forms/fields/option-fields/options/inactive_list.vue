<template>
  <div class="well well-light">
    <ul class="fields-inline-heading px-1" v-if="inactiveOptions.length">
      <li class="w-64 fields-inline-heading-item">Label</li>
      <li class="w-64 fields-inline-heading-item">Default Value</li>
    </ul>
    <ul v-if="inactiveOptions.length">
      <li v-for="option in inactiveOptions" :key="option.id"
          class="card card-sm mb-1 flex flex-row items-center justify-between">
        <div class="fields-inline">
          <text-field :value="option.label" field_disabled="true"/>
          <text-field :value="option.value" field_disabled="true"/>
        </div>
        <add-option class="mx-1" :option="option"></add-option>
      </li>
    </ul>
    <table-empty-state v-else heading="No Available Options" copy="All available options are currently in use for this field."></table-empty-state>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import addInactiveOption from '@/components/forms/fields/option-fields/options/add_inactive_option'
export default {
  computed: {
    ...mapGetters({
      inactiveOptions: 'getInactiveOptions'
    })
  },
  components: {
    'add-option': addInactiveOption
  }
}
</script>
