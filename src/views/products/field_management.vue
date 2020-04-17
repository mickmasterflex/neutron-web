<template>
  <div>
    <ul class="flex-row">
      <li class="active"><router-link :to="{name: 'Products'}">Product Mgmt</router-link></li>
      <li><router-link :to="{name: 'FieldManagement'}">Field Mgmt</router-link></li>
    </ul>
    <div class="hud">
      <h1 class="h1 text-white">Fields</h1>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>
