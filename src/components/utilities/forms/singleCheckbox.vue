<template>
  <label :for="`${id}`" class="block font-bold rounded-md bg-gray-200 text-gray-900 block p-2 pb-3 mt-3 w-64">
    <input type="checkbox" :v-model="`${model}`" :id="`${id}`" class="mr-2">
    <span>{{label}}</span>
  </label>
</template>

<script>
export default {
  props: ['label', 'id', 'model']
}
</script>
