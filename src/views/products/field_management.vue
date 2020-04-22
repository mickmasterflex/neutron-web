<template>
  <div>
    <ul class="flex-row">
      <li class="active"><router-link :to="{name: 'Products'}">Product Mgmt</router-link></li>
      <li><router-link :to="{name: 'FieldManagement'}">Field Mgmt</router-link></li>
    </ul>
    <div class="hud">
      <h1 class="h1 text-white">Fields</h1>
    </div>

    <div class="flex flex-row justify-between mt-4">
      <h2 class="h3">Base Text Fields</h2>
      <button class="btn btn-green" @click="showModalCreateBaseTextField = true">Create Base Text Field</button>
    </div>
    <create-base-text-field-modal :show="showModalCreateBaseTextField" @close="showModalCreateBaseTextField=false"></create-base-text-field-modal>
    <list-base-text-fields class="mt-5 mb-2"></list-base-text-fields>

    <div class="flex flex-row justify-between mt-4">
      <h2 class="h3">Base Option Fields</h2>
      <button class="btn btn-green" @click="showModalCreateBaseOptionField = true">Create Base Option Field</button>
    </div>
    <create-base-option-field-modal :show="showModalCreateBaseOptionField" @close="showModalCreateBaseOptionField=false"></create-base-option-field-modal>
    <list-base-option-fields class="mt-5 mb-2"></list-base-option-fields>
  </div>
</template>

<script>
import listBaseTextFields from '@/components/fields/base/text/list'
import createBaseTextField from '@/components/fields/base/text/create'
import listBaseOptionFields from '@/components/fields/base/option/list'
import createBaseOptionField from '@/components/fields/base/option/create'

export default {
  data () {
    return {
      showModalCreateBaseTextField: false,
      showModalCreateBaseOptionField: false
    }
  },
  components: {
    'list-base-text-fields': listBaseTextFields,
    'create-base-text-field-modal': createBaseTextField,
    'list-base-option-fields': listBaseOptionFields,
    'create-base-option-field-modal': createBaseOptionField
  }
}
</script>
