<template>
  <modal-template
    :allowScroll="true"
    modalClass="modal-xs"
    modalDialogClass="top-30%"
    modalPosition="absolute"
    modalBackdropColor="bg-gray-100"
    class="rounded-b-xl"
    @modal-after-leave="$emit('modal-after-leave')"
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
