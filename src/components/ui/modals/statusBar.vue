<template>
  <label :class="`bg-${color}-500 text-${color}-900 px-8 py-2 w-full block`">
    <font-awesome-icon v-if="icon" :icon="icon" class="mr-2"></font-awesome-icon>
    <span class="font-bold">{{copy}}</span>
  </label>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: false
    },
    copy: {
      type: String,
      required: true
    }
  }
}
</script>
