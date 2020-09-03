<template>
  <modal-template
    :allowScroll="true"
    modalClass="modal-xs"
    modalPosition="absolute"
    modalBackdropColor="bg-gray-200"
    class="rounded-b-xl"
    :show="show" @close="close">
    <template v-slot:header>
      <slot name="header">Modal Header</slot>
    </template>
    <template v-slot:body>
      <slot name="body">Modal Body</slot>
    </template>
    <template v-slot:footer-default>
      <button class="btn btn-hollow-default" @click="close">Close</button>
    </template>
    <template v-slot:footer-additional>
      <slot name="footer-additional"></slot>
    </template>
  </modal-template>
</template>

<script>
export default {
  props: {
    show: Boolean
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>
