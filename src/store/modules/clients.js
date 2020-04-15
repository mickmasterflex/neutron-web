import axios from '@/axios'

const state = {
  clients: []
}

const getters = {
  getAllClients: state => state.clients,
  getClientById: (state) => (id) => {
    return state.clients.find(client => client.id === id)
  },
  getAllClientsCount: (state) => {
    return state.clients.length
  }
}

const actions = {
  async fetchClients ({ commit }) {
    await axios.get('/clients/')
      .then(response => {
        commit('SET_CLIENTS', response.data)
      })
  },
  async createClient ({ commit }, client) {
    await axios.post('/clients/', client)
      .then(response => {
        commit('ADD_CLIENT', response.data)
      })
  },
  async updateClient ({ commit }, updatedClient) {
    await axios.put(`/clients/${updatedClient.id}/`, updatedClient)
      .then(() => {
        commit('UPDATE_CLIENT', updatedClient)
      })
  },
  async deleteClient ({ commit }, id) {
    await axios.delete(`/clients/${id}/`)
      .then(() => {
        commit('REMOVE_CLIENT', id)
      })
  }
}

const mutations = {
  SET_CLIENTS: (state, clients) => (state.clients = clients),
  ADD_CLIENT: (state, client) => state.clients.unshift(client),
  UPDATE_CLIENT: (state, updatedClient) => {
    const index = state.clients.findIndex(client => client.id === updatedClient.id)
    if (index !== -1) {
      state.clients.splice(index, 1, updatedClient)
    }
  },
  REMOVE_CLIENT: (state, id) => (state.clients = state.clients.filter(client => client.id !== id))
}

export default {
  state,
  getters,
  actions,
  mutations
}
