<template>
  <span class="text-lg lg:text-2xl xl:text-3xl lg:font-light" @click="$emit('click')">
    <slot/>
  </span>
</template>

<script>
export default {}
</script>
