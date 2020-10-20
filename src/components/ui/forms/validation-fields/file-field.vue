<template>
  <div class="field-group">
    <label class="field-label" v-if="$attrs.field_label" :for="$attrs.field_id">{{$attrs.field_label}}</label>
    <validation-provider
      :rules="rules" :vid="$attrs.field_id" :name="$attrs.field_id"
      v-slot="{ errors, classes }"
      ref="provider">
      <div class="flex flex-row items-center">
        <span :class="`btn btn-turquoise base-btn-field ${classes} ${field_disabled ? 'disabled' : ''}`" @click="$refs.fileInput.click()">
          <font-awesome-icon :icon="icon"></font-awesome-icon> {{button_text}}
        </span>
        <span v-if="selected_file" class="text-gray-800 italic ml-2">
          <font-awesome-icon :icon="errors.length ? 'times-circle' : 'check-circle'" :class="errors.length ? 'text-red-600' : 'text-green-600'"></font-awesome-icon> {{selected_file.name}}
        </span>
      </div>
      <input type="file" :disabled="field_disabled" @change="onSelectedFile" ref="fileInput" style="display: none"/>
      <span class="field-error" v-show="errors.length">{{ errors[0] }}</span>
    </validation-provider>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: 'image'
    },
    button_text: {
      type: String,
      default: 'Select a File'
    },
    rules: {
      type: [Object, String],
      default: ''
    },
    field_disabled: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      selected_file: null
    }
  },
  methods: {
    async onSelectedFile (e) {
      const { valid } = await this.$refs.provider.validate(e)

      if (valid) {
        this.selected_file = e.target.files[0]
      } else {
        this.selected_file = null
      }
    }
  },
  watch: {
    selected_file (newVal) {
      this.$emit('input', newVal)
    }
  }
}
</script>
