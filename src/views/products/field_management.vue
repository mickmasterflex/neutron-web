<template>
  <div>
    <ul class="flex-row">
      <li class="active"><router-link :to="{name: 'Products'}">Product Mgmt</router-link></li>
      <li><router-link :to="{name: 'FieldManagement'}">Field Mgmt</router-link></li>
    </ul>
    <div class="hud">
      <h1 class="h1 text-white">Fields</h1>
    </div>

    <h2 class="h2 mt-5 mb-2">Base Text Fields</h2>

    <h3 class="h3 mt-5 mb-2">Create</h3>
    <create-base-text-field></create-base-text-field>
    <base-text-field-list class="mt-5 mb-2"></base-text-field-list>
  </div>
</template>

<script>
import baseTextFieldList from '@/components/fields/list'
import createBaseTextField from '@/components/fields/create'

export default {
  components: {
    'base-text-field-list': baseTextFieldList,
    'create-base-text-field': createBaseTextField
  }
}
</script>
