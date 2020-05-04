<template>
  <div class="flex flex-row items-center">
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
    <span class="btn btn-circle btn-o-green ml-2" @click="addToCreate">+</span>
  </div>
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
    field: Object
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
    addToCreate () {
      this.createBaseOption(this.baseOption)
        .then(() => {
          this.fetchCurrentBaseOptionField(this.field.id)
        })
    }
  }
}
</script>
