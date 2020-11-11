<template>
  <ul class="tr flex flex-row">
    <li class="td w-32">
      <checkbox-field :field_id="buyer.id" @input="saveBuyer()" v-model="buyerGroup"></checkbox-field>
      Buyer
    </li>
    <li class="td w-64">{{buyer.name}}</li>
    <li class="td w-32">{{buyer.status}}</li>
  </ul>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      buyerGroup: false
    }
  },
  props: {
    buyer: {
      type: Object
    }
  },
  methods: {
    ...mapActions({
      updateBuyer: 'updateBuyer'
    }),
    saveBuyer () {
      const updatedBuyer = this.buyer
      if (this.buyerGroup) {
        updatedBuyer.buyer_group = this.currentBuyerGroup.id
      } else {
        updatedBuyer.buyer_group = null
      }
      this.updateBuyer(updatedBuyer)
    },
    setGroup () {
      if (this.buyer) {
        this.buyerGroup = this.currentBuyerGroup.id === this.buyer.buyer_group
      }
    }
  },
  watch: {
    currentBuyerGroup () {
      if (this.currentBuyerGroup.id) {
        this.setGroup()
      }
    }
  },
  computed: {
    ...mapGetters({
      currentBuyerGroup: 'getCurrentBuyerGroup'
    })
  }
}
</script>
