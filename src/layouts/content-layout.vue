<template>
  <div>
    <div class="px-8 pt-8">
      <slot name="hud">
        <hud-panel>
          <template v-slot:hud-content>
            <slot name="hud-content"></slot>
          </template>
        </hud-panel>
      </slot>
      <slot name="contentTabs"></slot>
    </div>
    <div :class="`px-8 pt-5 ${contentTabsBorder}`">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import hudPanel from '@/components/ui/hud/default'

export default {
  computed: {
    contentTabsBorder () {
      if (this.$slots.contentTabs) {
        return 'border-t border-gray-300'
      } else {
        return ''
      }
    }
  },
  components: {
    'hud-panel': hudPanel
  }
}
</script>
