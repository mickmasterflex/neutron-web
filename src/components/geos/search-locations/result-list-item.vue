<template>
  <tr class="tr">
    <td class="td">{{ location.code }}</td>
    <td class="td">{{ location.name }}</td>
    <td class="td font-bold">
      <span :class="`text-${found ? 'green' : 'red'}-600`"><font-awesome-icon :icon="found ? 'check' : 'times'"></font-awesome-icon> {{ invalid ? 'invalid location code' : found }}</span>
    </td>
    <td class="td font-bold">
      <router-link v-if="inherited" :to="{ name: 'BuyerContract', params: { id: location.contract_id } }" class="text-link">{{ location.contract_name }}</router-link>
      <span v-else>n/a</span>
    </td>
  </tr>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    location: String,
    found: Boolean,
    inherited: {
      default: false,
      type: Boolean
    },
    invalid: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    ...mapGetters({
      clientData: 'getCurrentClientData'
    })
  }
}
</script>
