import { mapMutations } from 'vuex'

export const setBreadcrumbsWithAncestors = {
  methods: {
    setBreadcrumbsWithAncestors () {
      if (this.setBreadcrumbText) {
        this.setBreadcrumbText()
      }
      const breadcrumbs = [
        this.clientsBreadcrumb,
        this.clientBreadcrumb
      ]
      this.ancestors.forEach(ancestor => {
        breadcrumbs.push({
          name: this.ancestorBreadcrumbRouteName,
          text: ancestor.name,
          params: {
            clientId: this.$route.params.clientId,
            id: ancestor.id
          },
          query: this.$route.query
        })
      })
      if (this.contractBreadcrumb) {
        breadcrumbs.push(this.contractBreadcrumb)
      }
      if (this.offersBreadcrumb) {
        breadcrumbs.push(this.offersBreadcrumb)
      }
      if (this.offerBreadcrumb) {
        breadcrumbs.push(this.offerBreadcrumb)
      }
      if (this.campaignsBreadcrumb) {
        breadcrumbs.push(this.campaignsBreadcrumb)
      }
      if (this.campaignBreadcrumb) {
        breadcrumbs.push(this.campaignBreadcrumb)
      }
      if (this.currentBreadcrumb) {
        breadcrumbs.push(this.currentBreadcrumb)
      }
      this.setBreadcrumbs(breadcrumbs)
    },
    ...mapMutations({
      setBreadcrumbs: 'SET_CURRENT_BREADCRUMBS'
    })
  }
}
