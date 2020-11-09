<template>
  <tr class="tr">
    <td class="td">
      <font-awesome-icon v-if="!childrenVisible" @click="toggleChildren(true)" icon="caret-right" class="text-gray-500"></font-awesome-icon>
      <font-awesome-icon v-if="childrenVisible" @click="toggleChildren(false)" icon="caret-down" class="text-gray-800"></font-awesome-icon>
      <checkbox-field :field_id="client.id" @input="alert('hi')" v-model="checked"></checkbox-field>
      Client
    </td>
    <td class="td">{{client.name}}</td>
    <td class="td">{{client.status}}</td>
    <tr-buyer v-for="buyer in buyers" :key="buyer.id" :buyer="buyer" v-show="childrenVisible"></tr-buyer>
  </tr>
</template>

<script>
import { mapGetters } from 'vuex'
import buyerRow from '@/components/buyer-groups/table/tr/buyer'

export default {
  data () {
    return {
      checked: false,
      childrenVisible: false
    }
  },
  props: {
    client: {
      type: Object
    }
  },
  computed: {
    ...mapGetters({
      getParentlessBuyersByClient: 'getParentlessBuyersByClient'
    }),
    buyers () {
      return this.getParentlessBuyersByClient(this.client.id)
    }
  },
  methods: {
    toggleChildren (boolean) {
      this.childrenVisible = boolean
    }
  },
  components: {
    'tr-buyer': buyerRow
  }
}
</script>
