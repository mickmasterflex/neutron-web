<template>
  <div>
    <ul class="flex-row">
      <li class="active"><router-link :to="{name: 'Products'}">Product Mgmt</router-link></li>
      <li><router-link :to="{name: 'FieldManagement'}">Field Mgmt</router-link></li>
    </ul>
    <div class="hud">
      <h1 class="h1 text-white">Fields</h1>
    </div>

    <div class="flex flex-col mt-4">
      <button class="btn btn-green self-end" @click="showModalCreateBaseTextField = true">Create Base Text Field</button>
    </div>

    <create-base-text-field-modal :show="showModalCreateBaseTextField" @close="showModalCreateBaseTextField=false"></create-base-text-field-modal>
    <base-text-field-list class="mt-5 mb-2"></base-text-field-list>
  </div>
</template>

<script>
import baseTextFieldList from '@/components/fields/list'
import createBaseTextField from '@/components/fields/create'

export default {
  data () {
    return {
      showModalCreateBaseTextField: false
    }
  },
  components: {
    'base-text-field-list': baseTextFieldList,
    'create-base-text-field-modal': createBaseTextField
  }
}
</script>
