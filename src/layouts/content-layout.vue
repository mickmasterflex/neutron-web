<template>
  <div>
    <div class="px-8 pt-8">
      <slot name="hud"></slot>
      <slot name="contentTabs"></slot>
    </div>
    <div :class="`px-8 pt-5 ${contentTabsBorder}`">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    contentTabsBorder () {
      if (this.$slots.contentTabs) {
        return 'border-t border-gray-300'
      } else {
        return ''
      }
    }
  }
}
</script>
