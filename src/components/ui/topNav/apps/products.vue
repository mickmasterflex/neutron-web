<template>
  <ul class="flex flex-row">
    <top-nav-item label="Product Mgmt" route="Brands" :active="active === 'product-mgmt'"></top-nav-item>
    <top-nav-item label="Field Mgmt" route="FieldManagement" :active="active === 'field-mgmt'"></top-nav-item>
  </ul>
</template>

<script>
export default {
  props: {
    active: {
      type: String,
      default: 'product-mgmt'
    }
  }
}
</script>
