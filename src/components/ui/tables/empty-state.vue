<template>
  <div class="text-center py-5">
    <h4 class="h3">{{ heading }}</h4>
    <p>{{ copy }}</p>
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
