<template>
  <ul>
    <li class="flex flex-row items-center" v-for="option in options" :key="option.id">
      <v-text-field
        :value="`${option.label}`"
        :field_id="`optionLabel_${option.id}`"
        rules="required"
        class="field-group"/>
      <v-text-field
        :value="`${option.order}`"
        :field_id="`optionLabel_${option.id}`"
        rules="required"
        class="field-group"/>
      <v-text-field
        :value="`${option.value}`"
        :field_id="`optionLabel_${option.id}`"
        rules="required"
        class="field-group mt-0"/>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    options: Array
  }
}
</script>
