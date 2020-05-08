<template>
  <div>
    <h2>Contract Form</h2>
    <div v-if="form.fields">
      <div class="bg-gray-900 text-white rounded flex flex-row items-center">
        <span class="py-1 px-3">ID</span>
        <span class="py-1 px-3">Label</span>
        <span class="py-1 px-3">Mapping</span>
        <span class="py-1 px-3">Deliver</span>
      </div>
      <div v-for="field in form.fields" :key="field.id" class="flex flex-row items-center">
        <text-field :value="field.id" disabled="disabled"/>
        <text-field :value="field.label" disabled="disabled"/>
        <text-field :value="field.mapping" disabled="disabled"/>
        <text-field :value="field.deliver" disabled="disabled"/>
        <button class="btn btn-circle btn-o-blue" @click="editTextField(field.id)">e</button>
      </div>
    </div>
    <div v-else>
      No Fields
    </div>
    <update-text-field :field="this.currentTextField" ref="updateTextField" v-show="showUpdateText"></update-text-field>
  </div>
</template>

<script>
import updateTextField from '@/components/fields/text-fields/update'
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    form: Object,
    showUpdateText: {
      type: Boolean,
      default: false
    }
  },
  components: {
    'update-text-field': updateTextField
  },
  methods: {
    ...mapActions(['fetchCurrentTextField']),
    editTextField (id) {
      this.fetchCurrentTextField(id)
    }
  },
  computed: {
    ...mapGetters({ currentTextField: 'getCurrentTextField' })
  },
  watch: {
    currentTextField () {
      this.showUpdateText = true
    }
  }
}
</script>
