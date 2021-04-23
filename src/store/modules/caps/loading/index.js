import putLoading from './put'
import postLoading from './post'
import deleteLoading from './delete'
import fetchLoading from './fetch'

const modules = {
  fetchLoading,
  putLoading,
  postLoading,
  deleteLoading
}

const getters = {
  getCapsLoading: state => {
    if (state.fetchLoading.caps_fetch_loading) {
      return state.fetchLoading.caps_fetch_loading
    }
    if (state.putLoading.caps_put_loading) {
      return state.putLoading.caps_put_loading
    }
    if (state.postLoading.caps_post_loading) {
      return state.postLoading.caps_post_loading
    }
    return state.deleteLoading.caps_delete_loading
  }
}

export default {
  modules,
  getters
}
