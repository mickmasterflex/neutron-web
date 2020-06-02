<template>
  <div>
    <ul class="flex flex-row mb-3">
      <li class="active"><router-link class="text-link" :to="{name: 'Products'}">Product Mgmt</router-link></li>
      <li class="px-3"> | </li>
      <li><router-link class="text-link" :to="{name: 'FieldManagement'}">Field Mgmt</router-link></li>
    </ul>
    <div class="hud">
      <h1 class="h1 text-white">Fields</h1>
    </div>

    <div class="flex flex-row justify-between mt-4">
    <h2 class="h3">Base Fields</h2>
    <button class="btn btn-green" @click="showCreateBaseFieldModal()">Create Base Field</button>
  </div>
    <list-base-fields class="mt-5"></list-base-fields>
    <create-base-field-modal></create-base-field-modal>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import createBaseField from '@/components/forms/base-fields/create'
import listBaseFields from '@/components/forms/base-fields/list'

export default {
  methods: {
    ...mapMutations({
      showCreateBaseFieldModal: 'SHOW_CREATE_BASE_FIELD_MODAL'
    })
  },
  components: {
    'create-base-field-modal': createBaseField,
    'list-base-fields': listBaseFields
  }
}
</script>
