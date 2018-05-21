import Vue from 'vue'
import Vuex from 'vuex'
import note from './modules/note'
import notebook from './modules/notebook'
import user from './modules/user'
import trash from './modules/trash'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    notebook,
    note,
    user,
    trash
  }
})
