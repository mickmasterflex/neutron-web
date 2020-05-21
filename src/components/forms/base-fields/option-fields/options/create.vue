<template>
  <validation-observer v-slot="{ handleSubmit }" ref="form">
    <form @submit.prevent="handleSubmit(submitForm)" class="flex flex-row items-center">
      <v-text-field
        v-model="order"
        :field_id="`newOptionOrder`"
        rules="required|integer"
        field_type="number"
        class="field-group field-sm mr-2"/>
      <v-text-field
        v-model="label"
        :field_id="`newOptionLabel`"
        rules="required"
        class="field-group mr-2"/>
      <v-text-field
        v-model="value"
        :field_id="`newOptionValue`"
        rules="required"
        class="field-group"/>
      <button class="btn btn-circle btn-o-green ml-2" type="submit">+</button>
    </form>
  </validation-observer>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      order: '',
      label: '',
      value: ''
    }
  },
  props: {
    field: Object,
    show: Boolean
  },
  watch: {
    show () {
      if (this.show === false) {
        this.order = ''
        this.label = ''
        this.value = ''
        this.$nextTick(() => {
          this.$refs.form.reset()
        })
      }
    }
  },
  computed: {
    baseOption: function () {
      return {
        order: this.order,
        label: this.label,
        value: this.value,
        field: this.field.id
      }
    }
  },
  methods: {
    ...mapActions({
      createBaseOption: 'createBaseOption',
      fetchCurrentBaseOptionField: 'fetchCurrentBaseOptionField'
    }),
    submitForm () {
      this.createBaseOption(this.baseOption)
    }
  }
}
</script>
