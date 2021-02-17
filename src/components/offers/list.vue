<template>
  <transition-table-state>
    <table v-if="offers.length" class="table table-white">
      <thead>
        <tr>
          <th class="th">Name</th>
          <th class="th">ID</th>
          <th class="th">Contract</th>
          <th class="th">Status</th>
          <th class="th">Caps</th>
<!--          <th class="th">Product</th>-->
        </tr>
      </thead>
      <tbody class="tbody">
        <tr class="tr" v-for="offer in this.offers" :key="offer.id">
          <td class="td">
            <span @click="linkToOffer(offer)" class="text-link">{{offer.name}}</span>
          </td>
          <td class="td">{{ offer.id }}</td>
          <td class="td">{{ offer.parent }}</td>
          <td class="td w-32">
            <status-indicator :red="offer.status === 'terminated'"
                              :green="offer.status === 'active'"
                              :yellow="offer.status === 'paused'">
              {{ offer.status }}
            </status-indicator>
          </td>
            <td class="td">{{ offer.cap }}</td>
        </tr>
      </tbody>
    </table>
    <table-empty-state v-else
                       :heading="emptyStateHeading"
                       key="empty"
                       :copy="emptyStateCopy"></table-empty-state>
  </transition-table-state>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    contracts: Array,
    offers: Array,
    client: String,
    emptyStateHeading: {
      type: String,
      default: 'No Offers Added'
    },
    emptyStateCopy: {
      type: String,
      default: 'Use the "New Offer" button to get started.'
    }
  },
  methods: {
    ...mapMutations({
      setCurrentOffer: 'SET_CURRENT_OFFER'
    }),
    linkToOffer (offer) {
      this.setCurrentOffer(offer)
      this.$router.push({ name: 'OfferDetails', params: { client: this.client, buyer: offer.parent, id: offer.id } })
    }
  }
}
</script>
