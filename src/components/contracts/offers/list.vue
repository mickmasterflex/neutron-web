<template>
  <transition-table-state>
    <table v-if="offers.length" class="table table-striped">
      <thead>
        <tr>
          <slot name="additional-th"></slot>
          <th class="th">ID</th>
          <th class="th">Name</th>
          <th class="th">Status</th>
          <th class="th">Contract</th>
          <th class="th">Caps</th>
        </tr>
      </thead>
      <tbody class="tbody">
        <tr class="tr" v-for="(offer, index) in offers" :key="offer.id">
          <slot name="additional-td" :offer="offer" :index="index"></slot>
          <td class="td">{{ offer.id }}</td>
          <td class="td">
            <span @click="linkToOffer(offer)" class="text-link">{{offer.name}}</span>
          </td>
          <status-td
            :status="offer.status"
            :activateAt="offer.activate_at"
          />
          <td class="td">{{ offer.parent_data.name }}</td>
          <td class="td">
            <caps-count :caps="offer.caps"></caps-count>
          </td>
        </tr>
      </tbody>
    </table>
    <table-empty-state v-else
                       :heading="emptyStateHeading"
                       class="well"
                       key="empty"
                       :copy="emptyStateCopy"></table-empty-state>
  </transition-table-state>
</template>

<script>
import { mapMutations } from 'vuex'
import capsCount from '@/components/caps/caps-count'
import statusActivateTd from '@/components/contracts/td-status-activateAt'

export default {
  components: {
    'caps-count': capsCount,
    'status-td': statusActivateTd
  },
  props: {
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
      setCurrentOffer: 'SET_CURRENT_OFFER',
      setCurrentClientData: 'SET_CURRENT_CLIENT_DATA',
      setCurrentAncestors: 'SET_CURRENT_ANCESTORS',
      setCurrentForm: 'SET_CURRENT_FORM',
      sortCurrentFormFields: 'SORT_CURRENT_FORM_FIELDS'
    }),
    linkToOffer (offer) {
      this.setCurrentOffer(offer)
      this.setCurrentForm(offer.form)
      this.setCurrentClientData(offer.client_data)
      this.sortCurrentFormFields()
      this.setCurrentAncestors(offer.buyer_ancestors)
      this.$router.push({
        name: 'OfferDetails',
        params: {
          client: offer.client_data.slug,
          buyer: offer.parent,
          id: offer.id
        }
      })
    }
  }
}
</script>
