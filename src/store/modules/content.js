// src/store/modules/content.js
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default {
  namespaced: true,
  state: {
    siteContent: null,
    loading: false,
    error: null
  },
  mutations: {
    SET_CONTENT(state, content) {
      state.siteContent = content;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    }
  },
  actions: {
    async fetchContent({ commit }) {
      try {
        commit('SET_LOADING', true);
        const docRef = doc(db, 'site-content', 'main');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          commit('SET_CONTENT', docSnap.data());
        }
      } catch (error) {
        commit('SET_ERROR', error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    }
  },
  getters: {
    getContent: state => state.siteContent,
    isLoading: state => state.loading,
    getError: state => state.error
  }
}