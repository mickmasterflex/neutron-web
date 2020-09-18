<template>
  <div>
    <button class="btn btn-turquoise" @click="showForm()" v-show="!formVisible"><font-awesome-icon icon="plus"></font-awesome-icon> Add Pricing Tier Group</button>
    <transition enter-active-class="animate__animated animate__slideInRight animate__fast">
      <div class="flex flex-row items-start" v-show="formVisible">
        <validation-observer ref="form">
          <form @submit.prevent="submitForm" class="form-horizontal form-horizontal-slim">
            <v-text-field field_class="field-tall" v-model="name" rules="required" field_id="name" field_label=" Name"></v-text-field>
          </form>
        </validation-observer>
        <button @click="submitForm()" class="btn btn-green ml-2"><font-awesome-icon icon="plus"></font-awesome-icon> Create Group</button>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      name: '',
      formVisible: false
    }
  },
  computed: {
    ...mapGetters({
      form: 'getCurrentForm'
    })
  },
  methods: {
    ...mapActions({
      create: 'createPricingTierGroup'
    }),
    resetForm () {
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
    },
    showForm () {
      this.formVisible = true
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.create({
            name: this.name
          }).then(() => {
          }).catch(error => {
            this.error = error
          })
        }
      })
    }
  }
}
</script>
