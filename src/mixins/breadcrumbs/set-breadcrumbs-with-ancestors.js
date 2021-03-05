import { mapMutations } from 'vuex'

export const setBreadcrumbsWithAncestors = {
  methods: {
    setBreadcrumbText () {
      console.log('test')
    },
    setBreadcrumbsWithAncestors () {
      this.setBreadcrumbText()
      const breadcrumbs = [
        this.$data.clientsBreadcrumb,
        this.$data.clientBreadcrumb
      ]
      this.ancestors.forEach(ancestor => {
        breadcrumbs.push({
          name: this.$data.contractBreadcrumb.name,
          text: ancestor.name,
          params: {
            clientId: this.$route.params.clientId,
            id: ancestor.id
          },
          query: this.$route.query
        })
      })
      breadcrumbs.push(this.$data.contractBreadcrumb)
      if (this.$data.offersBreadcrumb) {
        breadcrumbs.push(this.$data.offersBreadcrumb)
      }
      if (this.$data.offerBreadcrumb) {
        breadcrumbs.push(this.$data.offerBreadcrumb)
      }
      if (this.$data.campaignsBreadcrumb) {
        breadcrumbs.push(this.$data.campaignsBreadcrumb)
      }
      if (this.$data.campaignBreadcrumb) {
        breadcrumbs.push(this.$data.campaignBreadcrumb)
      }
      this.setBreadcrumbs(breadcrumbs)
    },
    ...mapMutations({
      setBreadcrumbs: 'SET_CURRENT_BREADCRUMBS'
    })
  }
}
