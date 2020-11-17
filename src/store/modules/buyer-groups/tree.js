const state = {
  loading_current_buyer_group_tree: false,
  current_buyer_group_tree: []
}

const getters = {
  getCurrentBuyerGroupTree: state => state.current_buyer_group_tree
}

const actions = {
  async fetchParentNode ({ commit, getters, dispatch }) {
    commit('TOGGLE_LOADING_TREE', true)
    await dispatch('fetchClients').then(() => {
      dispatch('fetchBuyers').then(() => {
        dispatch('nestBuyers')
      })
    })
  },
  async nestBuyers ({ commit, getters, dispatch }) {
    getters.getAllClients.forEach(c => {
      const client = c
      // const buyers = getters.getParentlessBuyersByClient(client.id)
      const buyers = client.buyercontract_set
      buyers.forEach((b, index) => {
        const buyerChildren = getters.getBuyersByParent(b.id)
        const buyer = b
        buyer.children = buyerChildren
        buyers.splice(index, 1, buyer)
      })
      client.children = buyers
      commit('ADD_CLIENT_TO_TREE', client)
    })
    // getters.getAllClients.forEach(client => {
    //   const cloooiant = client
    //   const buyers = []
    //   cloooiant.buyercontract_set.forEach(buyer => {
    //     const boooooier = buyer
    //     boooooier.buyercontract_set = []
    //     buyers.unshift(boooooier)
    //   })
    //   buyers.forEach((buyer, index) => {
    //     if (buyer.parent) {
    //       buyers.splice(index, 1)
    //       const parentIndex = buyers.findIndex(b => b.id === buyer.parent)
    //       if (parentIndex !== -1) {
    //         buyers[parentIndex].buyercontract_set.unshift(buyer)
    //       }
    //     }
    //   })
    //   cloooiant.buyercontract_set = buyers
    //   commit('ADD_CLIENT_TO_TREE', cloooiant)
    // })
  }
}

const mutations = {
  TOGGLE_LOADING_TREE: (state, boolean) => (state.loading_current_buyer_group_tree = boolean),
  SET_PARENT_NODE: (state, clients) => (state.current_buyer_group_tree = clients),
  ADD_CLIENT_TO_TREE: (state, client) => state.current_buyer_group_tree.unshift(client)
}

export default {
  state,
  getters,
  actions,
  mutations
}
