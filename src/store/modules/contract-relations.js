import axios from '@/axios'

const state = {
  contract_relations: [],
  current_contract_relation: {}
}

const getters = {
  getCurrentContractRelation: state => state.current_contract_relation,
  getContractRelationsByBuyer: (state) => (buyerId) => {
    return state.contract_relations.filter(relation => relation.buyer_contract === buyerId)
  }
}

const actions = {
  async fetchContractRelations ({ commit }) {
    await axios.get('/contract-relations/')
      .then(response => {
        commit('SET_CONTRACT_RELATIONS', response.data)
      })
  },
  async updateContractRelation ({ commit }, data) {
    await axios.put(`/contract-relations/${data.id}/`, data)
      .then(response => {
        commit('UPDATE_CONTRACT_RELATION', response.data)
      })
  }
}

const mutations = {
  SET_CONTRACT_RELATIONS: (state, relations) => (state.contract_relations = relations),
  UPDATE_CONTRACT_RELATION: (state, updatedContractRelation) => {
    const index = state.contract_relations.findIndex(group => group.id === updatedContractRelation.id)
    if (index !== -1) {
      state.contract_relations.splice(index, 1, updatedContractRelation)
    }
  },
  SET_CURRENT_CONTRACT_RELATION: (state, relation) => (state.current_contract_relation = relation)
}

export default {
  state,
  getters,
  actions,
  mutations
}
