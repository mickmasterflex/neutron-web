<template>
  <ul class="bg-gray-100 p-3">
    <li class="p-2 flex flex-row items-center">
      <span>Order - Label - Value - Delete</span>
    </li>
    <li v-for="option in options" :key="option.id">• {{option.label}}</li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      options: 'getCurrentOptions'
    })
  }
}
</script>
