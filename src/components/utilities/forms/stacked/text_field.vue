<template>
  <div class="stacked-field">
    <label :for="`${field_name}`">{{field_name | capitalize}}</label>
    <input class="base-field" type="text" :v-model="`${field_name}`" :id="`${field_name}`">
  </div>
</template>

<script>
export default {
  props: ['field_name']
}
</script>
