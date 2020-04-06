<template>
  <form @submit.prevent="updateBuyerContract">
    <text-field-stacked v-model="name" field_id="BuyerContractName" label="Name" :required="true"></text-field-stacked>
    <select-field-stacked v-model="parent" :options="siblings" field_id="buyerParent" label="Parent"></select-field-stacked>
    <button type="submit" class="btn btn-green mt-5">Submit</button>
  </form>
  </template>

<script>
import axios from '../../../axios'
  expoer default {
  data () {
    return
  }
}
</script>
