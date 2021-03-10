<template>
  <transition-table-state>
    <table v-if="leads.length" class="table table-striped text-sm">
      <thead>
      <tr>
        <th class="th">Lead Id</th>
        <th class="th">Lead Email</th>
        <slot name="additional-th"></slot>
        <th class="th">Scrub Reason</th>
        <th class="th">Created At</th>
        <th class="th">Updated At</th>
        <th class="th">Sold</th>
        <th class="th">Revenue</th>
        <th class="th">Margin</th>
        <th class="th">Payout</th>
      </tr>
      </thead>
      <tbody class="tbody">
      <tr class="tr" v-for="lead in leads" :key="lead.id">
        <td class="td">
          <span class="text-link" @click="linkToLeadPage(lead)">
            {{lead.id}}
          </span>
        </td>
        <td class="td">{{lead.data.email}}</td>
        <slot name="additional-td" :lead="lead"></slot>
        <td class="td" :class="!lead.reason ? 'text-gray-500 italic' : ''">{{lead.reason ? lead.reason : 'None'}}</td>
        <td-date :date="lead.created_at"></td-date>
        <td-date :date="lead.updated_at"></td-date>
        <td-date v-if="lead.sold_at" :date="lead.sold_at">
          <template v-slot:prefix>
            <font-awesome-icon icon="circle" class="text-green-500"></font-awesome-icon>
          </template>
        </td-date>
        <td v-else class="td font-bold text-red-500"><font-awesome-icon icon="circle"></font-awesome-icon> False</td>
        <td-number :dollar="true" :number="lead.revenue"></td-number>
        <td-number :dollar="true" :number="lead.margin"></td-number>
        <td-number :dollar="true" :number="lead.payout"></td-number>
      </tr>
      </tbody>
    </table>
    <table-empty-state v-else
                       :heading="emptyStateHeading"
                       :copy="emptyStateCopy"
                       key="empty"
                       class="well"></table-empty-state>
  </transition-table-state>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    leads: {
      type: [Object, Array],
      required: true
    },
    emptyStateHeading: {
      type: String,
      default: 'No leads in selected date range'
    },
    emptyStateCopy: {
      type: String,
      default: 'Try altering the date range'
    }
  },
  methods: {
    ...mapMutations({
      setCurrentLead: 'SET_CURRENT_LEAD'
    }),
    linkToLeadPage (lead) {
      this.setCurrentLead(lead)
      this.$router.push({ name: 'LeadPage', params: { id: lead.id } })
    }
  }
}
</script>
