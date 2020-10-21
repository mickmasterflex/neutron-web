<template>
  <div>
    <label :for="field_id" :class="`${label_class} ${checked === true ? 'border-green-500' : 'border-gray-500'} ${checked === false ? 'border-red-500' : 'border-gray-500'}`"
           class="toggle-switch transition-colors duration-150 border-2 rounded-lg bg-white p-1 flex flex-row justify-between cursor-pointer">
      <span :class="`switch switch-off ${checked === false ? 'active' : ''}`">
        <slot name="switch-off">
          <font-awesome-icon icon="ban" v-if="icons"></font-awesome-icon>
          <span v-else>Off</span>
        </slot>
      </span>
      <span :class="`switch switch-on ${checked === true ? 'active' : ''}`">
        <slot name="switch-on">
          <font-awesome-icon icon="check" v-if="icons"></font-awesome-icon>
          <span v-else>On</span>
        </slot>
      </span>
    </label>
    <input
      @input="handleInput($event.target.checked)"
      type="checkbox"
      :id="field_id"
      :class="$attrs.field_class"
      class="hidden"
      :checked="value"
      v-model="checked">
  </div>
</template>

<script>
export default {
  props: {
    field_label: {
      type: String
    },
    label_class: String,
    field_id: {
      type: String,
      required: true
    },
    value: {
      type: [Boolean, String]
    },
    icons: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      checked: this.value
    }
  },
  watch: {
    value () {
      this.checked = this.value
    }
  },
  methods: {
    handleInput (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped>
  .toggle-switch {
    padding: .125rem;
    height: 38px;
    width: 90px;
  }
  .switch {
    padding: .125rem;
    @apply w-1/2 flex text-gray-700 flex-row items-center justify-center font-bold select-none transition-colors duration-150 rounded
  }
  .switch.active {
    @apply text-white
  }
  .switch-on.active {
    @apply bg-green-500
  }
  .switch-off.active {
    @apply bg-red-500
  }
</style>
