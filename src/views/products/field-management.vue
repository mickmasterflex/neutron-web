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
      <span>
        <button class="btn btn-green mr-3" @click="showModalCreateBaseTextField = true">New Text Field</button>
        <button class="btn btn-green" @click="showModalCreateBaseOptionField = true">New Option Field</button>
      </span>
    </div>
    <list-base-fields class="mt-5"></list-base-fields>
    <create-base-text-field-modal :show="showModalCreateBaseTextField" @close="showModalCreateBaseTextField=false"></create-base-text-field-modal>
    <create-base-option-field-modal :show="showModalCreateBaseOptionField" @close="showModalCreateBaseOptionField=false"></create-base-option-field-modal>
  </div>
</template>

<script>
import createBaseTextField from '@/components/fields/base/text-fields/create'
import createBaseOptionField from '@/components/fields/base/option-fields/create'
import listBaseFields from '@/components/fields/base/list'

export default {
  data () {
    return {
      showModalCreateBaseTextField: false,
      showModalCreateBaseOptionField: false
    }
  },
  components: {
    'create-base-text-field-modal': createBaseTextField,
    'create-base-option-field-modal': createBaseOptionField,
    'list-base-fields': listBaseFields
  }
}
</script>
