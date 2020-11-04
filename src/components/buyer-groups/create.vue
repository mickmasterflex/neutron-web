<template>
  <div>
    <button class="btn btn-turquoise" @click="showCreateBuyerGroup()" v-show="formVisible === false"><font-awesome-icon icon="plus"></font-awesome-icon> New Buyer Group</button>
    <transition enter-active-class="animate__animated animate__fadeIn animate__fast" v-on:after-enter="$refs.focusField.focusOnField()">
      <div class="flex flex-row items-start" v-show="formVisible">
        <validation-observer ref="form">
          <form @submit.prevent="submitForm" class="form-horizontal form-horizontal-slim">
            <v-text-field ref="focusField" field_class="field-tall" v-model="name" rules="required" field_id="name" field_label=" Name"></v-text-field>
          </form>
        </validation-observer>
        <button @click="submitForm()" class="btn btn-green ml-2"><font-awesome-icon icon="plus"></font-awesome-icon> Create Group</button>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  data () {
    return {
      name: ''
    }
  },
  methods: {
    ...mapMutations({
      showCreateBuyerGroup: 'SHOW_CREATE_BUYER_GROUP_FORM',
      close: 'HIDE_CREATE_BUYER_GROUP_FORM'
    }),
    ...mapActions({
      createBuyerGroup: 'createBuyerGroup'
    }),
    resetForm () {
      this.name = ''
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.createBuyerGroup({
            name: this.name
          }).then(() => {
            this.resetForm()
            this.close()
          }).catch(error => {
            this.error = error
          })
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      formVisible: 'getShowCreateBuyerGroupForm'
    })
  }
}
</script>
