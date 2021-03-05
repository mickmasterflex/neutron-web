import { mapGetters, mapMutations } from 'vuex'

export const partnerContractBreadcrumbs = {
  data () {
    return {
      clientsBreadcrumb: {
        name: 'Clients',
        text: 'Clients'
      },
      clientBreadcrumb: {
        name: 'Client',
        text: this.$route.params.client,
        params: { slug: this.$route.params.client }
      },
      contractBreadcrumb: {
        name: 'PartnerContract',
        text: this.$route.params.id,
        params: {
          client: this.$route.params.client,
          id: this.$route.params.id
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      contract: 'getCurrentPartner'
    }),
    ancestors () {
      return this.contract.ancestors
    }
  },
  methods: {
    setBreadcrumbsWithAncestors () {
      if (this.contract) {
        this.$data.contractBreadcrumb.text = this.contract.name
      }
      if (this.contract.client) {
        this.$data.clientBreadcrumb.text = this.contract.client.name
      }
      const breadcrumbs = [
        this.$data.clientsBreadcrumb,
        this.$data.clientBreadcrumb
      ]
      this.ancestors.forEach(ancestor => {
        breadcrumbs.push({
          name: this.$data.contractBreadcrumb.name,
          text: ancestor.name,
          params: {
            client: this.$route.params.client,
            id: ancestor.id
          }
        })
      })
      breadcrumbs.push(this.$data.contractBreadcrumb)
      this.setBreadcrumbs(breadcrumbs)
    },
    ...mapMutations({
      setBreadcrumbs: 'SET_CURRENT_BREADCRUMBS'
    })
  }
}
