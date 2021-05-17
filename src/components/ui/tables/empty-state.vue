<template>
  <div class="text-center py-5">
    <h4 class="h3">{{ heading }}</h4>
    <p><slot name="copy">{{ copy }}</slot></p>
  </div>
</template>

<script>
export default {
  props: {
    heading: String,
    copy: String
  }
}
</script>
