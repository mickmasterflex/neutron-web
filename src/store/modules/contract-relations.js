import axios from '@/axios'

const state = {
  contract_relations: [],
  current_contract_relation: {}
}

const getters = {
  getCurrentContractRelation: state => state.current_contract_relation,
  getContractRelationsByBuyer: (state) => (buyerId) => {
    return state.contract_relations.filter(relation => relation.buyer_contract === buyerId)
  },
  getContractRelationsByPartner: (state) => (partnerId) => {
    return state.contract_relations.filter(relation => relation.partner_contract === partnerId)
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
  },
  async createContractRelation ({ commit }, relation) {
    console.log(relation)
    await axios.post('/contract-relations/', relation)
      .then(response => {
        commit('ADD_CONTRACT_RELATION', response.data)
      })
  },
  async deleteContractRelation ({ commit }, id) {
    await axios.delete(`/contract-relations/${id}/`)
      .then(() => {
        commit('REMOVE_CONTRACT_RELATION', id)
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
  SET_CURRENT_CONTRACT_RELATION: (state, relation) => (state.current_contract_relation = relation),
  ADD_CONTRACT_RELATION: (state, relation) => state.contract_relations.unshift(relation),
  REMOVE_CONTRACT_RELATION: (state, id) => (state.contract_relations = state.contract_relations.filter(relation => relation.id !== id))
}

export default {
  state,
  getters,
  actions,
  mutations
}
